# Generated by Django 5.0.3 on 2024-04-14 06:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0019_order_total_amount'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='total_usd_amount',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]
