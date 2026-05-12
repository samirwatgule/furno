from django.urls import path
from . import views

urlpatterns = [
    path('hero/',            views.HeroSlideListView.as_view(),          name='hero-list'),
    path('offerings/',       views.OfferingListView.as_view(),           name='offering-list'),
    path('inspiration/',     views.inspiration_view,                     name='inspiration'),
    path('stats/',           views.WhyChooseUsStatListView.as_view(),    name='stats-list'),
    path('calculators/',     views.CalculatorListView.as_view(),         name='calculator-list'),
    path('reviews/',         views.ReviewListView.as_view(),             name='review-list'),
    path('delivered-homes/', views.DeliveredHomeListView.as_view(),      name='delivered-homes-list'),
    path('process-steps/',   views.ProcessStepListView.as_view(),        name='process-steps-list'),
    path('articles/',        views.MagazineArticleListView.as_view(),    name='article-list'),
    path('designs/',         views.DesignListView.as_view(),             name='design-list'),
    path('projects/',        views.ProjectListView.as_view(),            name='project-list'),
    path('awards/',          views.AwardListView.as_view(),              name='award-list'),
    path('faqs/',            views.FAQListView.as_view(),                name='faq-list'),
    path('stores/',          views.StoreListView.as_view(),              name='store-list'),
    path('trending/',        views.TrendingProductListView.as_view(),    name='trending-list'),
    path('cities/',          views.cities_view,                          name='cities'),
    path('nav/',             views.nav_view,                             name='nav'),
    path('footer/',          views.footer_view,                          name='footer'),
    path('leads/',           views.LeadCreateView.as_view(),             name='lead-create'),
    path('contact/',         views.ContactMessageCreateView.as_view(),   name='contact-create'),
]
