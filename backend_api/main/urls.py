from django.urls import path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('address', views.CustomerAddressViewSet)
router.register('productrating', views.ProductRatingViewSet)

urlpatterns = [
    # Vendors
    path('vendors/', views.VendorList.as_view()),
    path('vendor/<int:pk>', views.VendorDetail.as_view()),
    # Products
    path('products/', views.ProductList.as_view()),
    path('product/<int:pk>', views.ProductDetail.as_view()),
    path('products/<str:tag>', views.TagProductList.as_view()),
    path('related-products/<int:pk>', views.RelatedProductList.as_view()),
    # Categories
    path('categories/', views.CategoryList.as_view()),
    path('category/<int:pk>', views.CategoryDetail.as_view()),
    # user
    path('user/<int:pk>', views.UserDetail.as_view()),
    # Customer
    path('customers/', views.CustomerList.as_view()),
    path('customer/<int:pk>', views.CustomerDetail.as_view()),
    path('customer/login', views.customer_login, name='customer_login'),
    path('customer/register', views.customer_register, name='customer_register'),
    path('customer/dashboard/<int:pk>',
         views.customer_dashboard, name='customer_dashboard'),
    # Order
    path('orders/', views.OrderList.as_view()),
    path('order/<int:pk>', views.OrderDetail.as_view()),
    path('orderitems/', views.OrderItem.as_view()),
    path('customer/<int:pk>/orderitems/', views.CustomerOrderItem.as_view()),
    path('update-order-status/<int:order_id>',
         views.update_order_status, name='update_order_status'),
    path('update-product-download-count/<int:product_id>',
         views.update_product_download_count, name='update_product_download_count'),
    # wishlist
    path('wishlist/', views.Wishlist.as_view()),
    path('check-in-wishlist/', views.checkInWishlist, name='check-in-wishlist'),
    path('remove-from-wishlist/', views.removeFromWishlist,
         name='remove-from-wishlist'),
    path('customer/<int:pk>/wishitems/', views.CustomerWishlistItem.as_view()),
    path('customer/<int:pk>/address-list/',
         views.CustomerAddressList.as_view()),
]

urlpatterns += router.urls
