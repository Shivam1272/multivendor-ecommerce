# Generated by Django 5.0.3 on 2024-06-06 07:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0021_wishlist'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='customeraddress',
            options={'verbose_name_plural': 'Customer Address'},
        ),
        migrations.AlterModelOptions(
            name='orderitems',
            options={'verbose_name_plural': 'Order Items'},
        ),
        migrations.AlterModelOptions(
            name='productcategory',
            options={'verbose_name_plural': 'Product Categories'},
        ),
        migrations.AlterModelOptions(
            name='wishlist',
            options={'verbose_name_plural': 'Wish list'},
        ),
        migrations.AddField(
            model_name='customer',
            name='profile_img',
            field=models.ImageField(null=True, upload_to='customer_imgs/'),
        ),
    ]
