from django.contrib import admin
from .models import (
    HeroSlide, Offering, InspirationTab, InspirationImage,
    WhyChooseUsStat, Calculator, Review, DeliveredHome,
    ProcessStep, MagazineArticle, Design, Project,
    Award, FAQ, Store, TrendingProduct, Lead, ContactMessage,
)


@admin.register(HeroSlide)
class HeroSlideAdmin(admin.ModelAdmin):
    list_display = ['title', 'tag', 'order']
    list_editable = ['order']
    ordering = ['order']


@admin.register(Offering)
class OfferingAdmin(admin.ModelAdmin):
    list_display = ['title', 'description', 'order']
    list_editable = ['order']


class InspirationImageInline(admin.TabularInline):
    model = InspirationImage
    extra = 1


@admin.register(InspirationTab)
class InspirationTabAdmin(admin.ModelAdmin):
    list_display = ['label', 'order']
    list_editable = ['order']
    inlines = [InspirationImageInline]


@admin.register(WhyChooseUsStat)
class WhyChooseUsStatAdmin(admin.ModelAdmin):
    list_display = ['value', 'description', 'order']
    list_editable = ['order']


@admin.register(Calculator)
class CalculatorAdmin(admin.ModelAdmin):
    list_display = ['title', 'cta', 'order']
    list_editable = ['order']


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['name', 'location', 'rating', 'created_at']
    list_filter = ['rating']
    search_fields = ['name', 'location', 'text']


@admin.register(DeliveredHome)
class DeliveredHomeAdmin(admin.ModelAdmin):
    list_display = ['title', 'city', 'bhk_type', 'style', 'completed_date']
    list_filter = ['city', 'style', 'bhk_type']
    search_fields = ['title', 'city']


@admin.register(ProcessStep)
class ProcessStepAdmin(admin.ModelAdmin):
    list_display = ['step', 'title']
    ordering = ['step']


@admin.register(MagazineArticle)
class MagazineArticleAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'category', 'read_time', 'featured']
    list_filter = ['category', 'featured']
    list_editable = ['featured']
    search_fields = ['title', 'author', 'category']


@admin.register(Design)
class DesignAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'style', 'order']
    list_filter = ['category', 'style']
    list_editable = ['order']
    search_fields = ['title', 'category']


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'city', 'bhk', 'budget', 'style']
    list_filter = ['city', 'style', 'bhk']
    search_fields = ['title', 'city']


@admin.register(Award)
class AwardAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon', 'order']
    list_editable = ['order']


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ['question', 'order']
    list_editable = ['order']


@admin.register(Store)
class StoreAdmin(admin.ModelAdmin):
    list_display = ['name', 'city', 'phone']
    list_filter = ['city']
    search_fields = ['name', 'city', 'address']


@admin.register(TrendingProduct)
class TrendingProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'discount', 'order']
    list_filter = ['category']
    list_editable = ['order']


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone', 'city', 'created_at']
    list_filter = ['city']
    search_fields = ['name', 'phone']
    readonly_fields = ['created_at']


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'created_at']
    search_fields = ['name', 'email', 'subject']
    readonly_fields = ['created_at']
