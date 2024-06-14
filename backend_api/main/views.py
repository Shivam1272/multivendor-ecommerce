from django.shortcuts import render
from rest_framework import generics, permissions, pagination, viewsets
from . import serializers, models
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.db import IntegrityError
from django.contrib.auth.models import User
from django.contrib.auth import authenticate


class VendorList(generics.ListCreateAPIView):
    queryset = models.Vendor.objects.all()
    serializer_class = serializers.VendorSerializer


class VendorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Vendor.objects.all()
    serializer_class = serializers.VendorDetailSerializer


class ProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductListSerializer
    # pagination_class = pagination.PageNumberPagination

    def get_queryset(self):
        qs = super().get_queryset()
        if 'category' in self.request.GET:
            category = self.request.GET['category']
            category = models.ProductCategory.objects.get(id=int(category))
            qs = qs.filter(category=category)
        if 'fetch_limit' in self.request.GET:
            limit = int(self.request.GET['fetch_limit'])
            qs = qs[:limit]
        return qs


class TagProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductListSerializer
    # pagination_class = pagination.PageNumberPagination

    def get_queryset(self):
        qs = super().get_queryset()
        tag = self.kwargs['tag']
        qs = qs.filter(tags__icontains=tag)
        return qs


class RelatedProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductListSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        product_id = self.kwargs['pk']
        product = models.Product.objects.get(id=product_id)
        qs = qs.filter(category=product.category).exclude(id=product_id)
        return qs


class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductDetailSerializer


class CustomerList(generics.ListCreateAPIView):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerSerializer


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer


class CustomerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerDetailSerializer


@csrf_exempt
def customer_login(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    # print(username, password)
    # print(authenticate(username=username, password=password))
    if user := authenticate(username=username, password=password):
        # print(user)
        customer = models.Customer.objects.get(user=user)
        # print(customer)
        msg = {
            'id': customer.id,
            'success': True,
            'username': user.username,
            'message': 'Valid Login Credentail'
        }
    else:
        # print("err")
        msg = {
            'success': False,
            'userData': None,
            'message': 'Invalid Login Credentail'
        }
    return JsonResponse(msg)


@csrf_exempt
def customer_register(request):
    first_name = request.POST.get('first_name')
    last_name = request.POST.get('last_name')
    username = request.POST.get('username')
    email = request.POST.get('email')
    mobile = request.POST.get('mobile')
    password = request.POST.get('password')
    # print(first_name, last_name, username, email, mobile, password)
    try:
        if new_user := User.objects.create(
            first_name=first_name,
            last_name=last_name,
            username=username,
            email=email,
            password=password,
        ):
            try:
                customer = models.Customer.objects.create(
                    user=new_user,
                    mobile=mobile
                )
                msg = {
                    'success': True,
                    'userID': new_user.id,
                    'customerID': customer.id,
                    'message': 'User created successfully'
                }
            except IntegrityError:
                msg = {
                    'success': True,
                    'userData': None,
                    'message': 'Mobile Number already exists'
                }
        else:
            msg = {
                'success': False,
                'userData': None,
                'message': 'Failed to create user'
            }
    except IntegrityError:
        msg = {
            'success': False,
            'userData': None,
            'message': 'Username already exists'
        }
    return JsonResponse(msg)


class OrderList(generics.ListCreateAPIView):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderSerializer


class OrderItem(generics.ListCreateAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrderItemSerializer


class CustomerOrderItem(generics.ListAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrderItemSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        customer_id = self.kwargs['pk']
        print(customer_id)
        qs = qs.filter(order__customer__id=customer_id)
        return qs


class OrderDetail(generics.ListAPIView):
    # queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrderDetailSerializer

    def get_queryset(self):
        order = self.kwargs['pk']
        order = models.Order.objects.get(id=order)
        return models.OrderItems.objects.filter(order__exact=order)


class CustomerAddressViewSet(viewsets.ModelViewSet):
    queryset = models.CustomerAddress.objects.all()
    serializer_class = serializers.CustomerAddressSerializer

    def perform_create(self, serializers):
        serializers.save()

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        data = request.data

        if data.get('default_address', False):
            # Unset default_address for all other addresses of the same customer
            models.CustomerAddress.objects.filter(
                customer=instance.customer).update(default_address=False)

        # Set the default_address for the current instance
        serializer = self.get_serializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)


class ProductRatingViewSet(viewsets.ModelViewSet):
    queryset = models.ProductRating.objects.all()
    serializer_class = serializers.ProductRatingSerializer


class CategoryList(generics.ListCreateAPIView):
    queryset = models.ProductCategory.objects.all()
    serializer_class = serializers.CategorySerializer


class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.ProductCategory.objects.all()
    serializer_class = serializers.CategoryDetailSerializer


@csrf_exempt
def update_order_status(request, order_id):
    if request.method == 'POST':
        isUpdated = models.Order.objects.filter(
            id=order_id).update(order_status=True)
        msg = {
            'success': False,
        }
        if (isUpdated):
            msg = {
                'success': True,
            }
    return JsonResponse(msg)


@csrf_exempt
def update_product_download_count(request, product_id):
    if request.method == 'POST':
        # print(product_id)
        product = models.Product.objects.get(id=product_id)
        # print(product)
        totalDownload = int(product.download) + 1
        isUpdated = models.Product.objects.filter(
            id=product_id).update(download=totalDownload)
        msg = {
            'success': False,
        }
        if (isUpdated):
            msg = {
                'success': True,
            }
    return JsonResponse(msg)


class Wishlist(generics.ListCreateAPIView):
    queryset = models.Wishlist.objects.all()
    serializer_class = serializers.WishlistSerializers


@csrf_exempt
def checkInWishlist(request):
    if request.method == 'POST':
        product_id = request.POST.get('product')
        customer_id = request.POST.get('customer')
        checkWishlist = models.Wishlist.objects.filter(
            product_id=product_id, customer_id=customer_id).count()
        msg = {
            'success': False
        }
        if checkWishlist > 0:
            msg = {
                'success': True
            }
    return JsonResponse(msg)


@csrf_exempt
def removeFromWishlist(request):
    if request.method == 'POST':
        wishlist_id = request.POST.get('wishlist_id')
        print(wishlist_id)
        res = models.Wishlist.objects.filter(id=wishlist_id).delete()
        print(res)
        msg = {
            'success': False
        }
        if res:
            msg = {
                'success': True
            }
    return JsonResponse(msg)


class CustomerWishlistItem(generics.ListAPIView):
    queryset = models.Wishlist.objects.all()
    serializer_class = serializers.WishlistSerializers

    def get_queryset(self):
        qs = super().get_queryset()
        customer_id = self.kwargs['pk']
        print(customer_id)
        qs = qs.filter(customer__id=customer_id)
        return qs


class CustomerAddressList(generics.ListAPIView):
    queryset = models.CustomerAddress.objects.all()
    serializer_class = serializers.CustomerAddressSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        customer_id = self.kwargs['pk']
        print(customer_id)
        qs = qs.filter(customer__id=customer_id)
        return qs


def customer_dashboard(request, pk):
    customer_id = pk
    print(customer_id)
    totalAddress = models.CustomerAddress.objects.filter(
        customer_id=customer_id).count()
    print(totalAddress)
    totalOrder = models.Order.objects.filter(
        customer_id=customer_id).count()
    print(totalOrder)
    totalWishlist = models.Wishlist.objects.filter(
        customer_id=customer_id).count()
    print(totalWishlist)
    msg = {
        "totalAddress": totalAddress,
        'totalOrder': totalOrder,
        'totalWishlist': totalWishlist,
    }

    return JsonResponse(msg)
