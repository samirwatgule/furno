from rest_framework import serializers
from .models import (
    HeroSlide, Offering, InspirationTab, InspirationImage,
    WhyChooseUsStat, Calculator, Review, DeliveredHome,
    ProcessStep, MagazineArticle, Design, Project,
    Award, FAQ, Store, TrendingProduct, Lead, ContactMessage,
)


class HeroSlideSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSlide
        fields = ['id', 'title', 'subtitle', 'cta', 'image', 'tag', 'order']


class OfferingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offering
        fields = ['id', 'title', 'description', 'image', 'link', 'order']


class InspirationImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = InspirationImage
        fields = ['image', 'order']


class InspirationTabSerializer(serializers.ModelSerializer):
    images = InspirationImageSerializer(many=True, read_only=True)

    class Meta:
        model = InspirationTab
        fields = ['label', 'order', 'images']


class WhyChooseUsStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhyChooseUsStat
        fields = ['id', 'icon', 'value', 'description', 'order']


class CalculatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calculator
        fields = ['id', 'title', 'description', 'cta', 'image', 'icon', 'order']


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'name', 'location', 'text', 'rating', 'avatar', 'project_image']


class DeliveredHomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveredHome
        fields = [
            'id', 'title', 'location', 'city', 'image', 'cover_image',
            'style', 'bhk_type', 'area_sqft', 'budget_min', 'budget_max', 'completed_date',
        ]


class ProcessStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessStep
        fields = ['step', 'title', 'description']


class MagazineArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = MagazineArticle
        fields = ['id', 'title', 'author', 'author_avatar', 'date', 'read_time',
                  'category', 'image', 'excerpt', 'featured']


class DesignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Design
        fields = ['id', 'title', 'category', 'style', 'image', 'order']


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'title', 'city', 'bhk', 'area', 'budget', 'style', 'image']


class AwardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Award
        fields = ['id', 'title', 'icon', 'order']


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ['id', 'question', 'answer', 'order']

    # Map question→q and answer→a to match frontend expectations
    def to_representation(self, instance):
        data = super().to_representation(instance)
        return {'id': data['id'], 'q': data['question'], 'a': data['answer'], 'order': data['order']}


class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ['id', 'name', 'city', 'address', 'phone', 'hours', 'image_url', 'latitude', 'longitude']


class TrendingProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrendingProduct
        fields = [
            'id', 'category', 'name', 'image', 'rating', 'reviews',
            'price', 'original_price', 'discount', 'badge', 'badge_variant', 'order',
        ]


class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ['id', 'name', 'phone', 'city', 'created_at']
        read_only_fields = ['id', 'created_at']


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'phone', 'city', 'subject', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']
