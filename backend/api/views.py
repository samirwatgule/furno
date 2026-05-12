from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .models import (
    HeroSlide, Offering, InspirationTab,
    WhyChooseUsStat, Calculator, Review, DeliveredHome,
    ProcessStep, MagazineArticle, Design, Project,
    Award, FAQ, Store, TrendingProduct, Lead, ContactMessage,
)
from .serializers import (
    HeroSlideSerializer, OfferingSerializer, InspirationTabSerializer,
    WhyChooseUsStatSerializer, CalculatorSerializer, ReviewSerializer,
    DeliveredHomeSerializer, ProcessStepSerializer, MagazineArticleSerializer,
    DesignSerializer, ProjectSerializer, AwardSerializer, FAQSerializer,
    StoreSerializer, TrendingProductSerializer, LeadSerializer, ContactMessageSerializer,
)

CITIES = [
    'Bengaluru', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad',
    'Pune', 'Kolkata', 'Noida', 'Gurugram', 'Ahmedabad',
    'Kochi', 'Lucknow', 'Jaipur', 'Chandigarh', 'Coimbatore',
    'Vizag', 'Mysore', 'Mangalore', 'Indore', 'Nagpur',
]


# ── Simple list views ─────────────────────────────────────────────────

class HeroSlideListView(generics.ListAPIView):
    queryset = HeroSlide.objects.all()
    serializer_class = HeroSlideSerializer


class OfferingListView(generics.ListAPIView):
    queryset = Offering.objects.all()
    serializer_class = OfferingSerializer


class WhyChooseUsStatListView(generics.ListAPIView):
    queryset = WhyChooseUsStat.objects.all()
    serializer_class = WhyChooseUsStatSerializer


class CalculatorListView(generics.ListAPIView):
    queryset = Calculator.objects.all()
    serializer_class = CalculatorSerializer


class ReviewListView(generics.ListAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class DeliveredHomeListView(generics.ListAPIView):
    queryset = DeliveredHome.objects.all()
    serializer_class = DeliveredHomeSerializer


class ProcessStepListView(generics.ListAPIView):
    queryset = ProcessStep.objects.all()
    serializer_class = ProcessStepSerializer


class MagazineArticleListView(generics.ListAPIView):
    queryset = MagazineArticle.objects.all()
    serializer_class = MagazineArticleSerializer


class DesignListView(generics.ListAPIView):
    queryset = Design.objects.all()
    serializer_class = DesignSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category', 'style']


class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['city', 'style', 'bhk']


class AwardListView(generics.ListAPIView):
    queryset = Award.objects.all()
    serializer_class = AwardSerializer


class FAQListView(generics.ListAPIView):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer


class StoreListView(generics.ListAPIView):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['city']


class TrendingProductListView(generics.ListAPIView):
    queryset = TrendingProduct.objects.all()
    serializer_class = TrendingProductSerializer


# ── Composite views ───────────────────────────────────────────────────

@api_view(['GET'])
def inspiration_view(request):
    """Return tabs + images dict in the format expected by the frontend."""
    tabs = InspirationTab.objects.prefetch_related('images').all()
    serialized = InspirationTabSerializer(tabs, many=True).data

    tab_labels = [t['label'] for t in serialized]
    images = {t['label']: [img['image'] for img in t['images']] for t in serialized}

    return Response({'tabs': tab_labels, 'images': images})


@api_view(['GET'])
def cities_view(request):
    return Response(CITIES)


@api_view(['GET'])
def nav_view(request):
    """Static nav structure — update via Django admin if needed."""
    from .nav_data import NAV_LINKS, OFFERINGS_NAV
    return Response({'navLinks': NAV_LINKS, 'offeringsNav': OFFERINGS_NAV})


@api_view(['GET'])
def footer_view(request):
    """Static footer data."""
    from .footer_data import FOOTER_DATA
    return Response(FOOTER_DATA)


# ── Form submission views ─────────────────────────────────────────────

class LeadCreateView(generics.CreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer

    def create(self, request, *args, **kwargs):
        super().create(request, *args, **kwargs)
        return Response(
            {'success': True, 'message': 'Consultation request submitted successfully'},
            status=status.HTTP_201_CREATED,
        )


class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def create(self, request, *args, **kwargs):
        super().create(request, *args, **kwargs)
        return Response(
            {'success': True, 'message': 'Message submitted successfully'},
            status=status.HTTP_201_CREATED,
        )
