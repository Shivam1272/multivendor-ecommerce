# Generated by Django 5.0.3 on 2024-04-02 06:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0012_orderitems_price_orderitems_qty'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderitems',
            name='price',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]