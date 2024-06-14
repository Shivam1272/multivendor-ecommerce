from django.contrib import admin
from . import models
# Register your models here.

admin.site.register(models.Vendor)

# admin.site.register(models.Product)
admin.site.register(models.ProductCategory)
admin.site.register(models.ProductRating)
admin.site.register(models.ProductImage)

# admin.site.register(models.Order)
# admin.site.register(models.OrderItems)

admin.site.register(models.Customer)
admin.site.register(models.CustomerAddress)


class ProductImagesInline(admin.StackedInline):
    model = models.ProductImage


class ProductAdmin(admin.ModelAdmin):
    list_display = ['title', 'price', 'usd_price', 'download']
    list_editable = ['usd_price']
    prepopulated_fields = {'slug': ('title',)}
    inlines = [
        ProductImagesInline,
    ]


admin.site.register(models.Product, ProductAdmin)


class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'customer', 'order_time',
                    'order_status', 'total_amount', 'total_usd_amount']


admin.site.register(models.Order, OrderAdmin)


class OrderItemsAdmin(admin.ModelAdmin):
    list_display = ['id', 'order', 'product', 'qty', 'price', 'usd_price']


admin.site.register(models.OrderItems, OrderItemsAdmin)


class WishlistAdmin(admin.ModelAdmin):
    list_display = ['id', 'product', 'customer']


admin.site.register(models.Wishlist, WishlistAdmin)
