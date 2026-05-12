from django.db import models


class HeroSlide(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.TextField()
    cta = models.CharField(max_length=100)
    image = models.URLField(max_length=500)
    tag = models.CharField(max_length=50, blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


class Offering(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=200)
    image = models.URLField(max_length=500)
    link = models.CharField(max_length=200, default='#')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


class InspirationTab(models.Model):
    label = models.CharField(max_length=100, unique=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.label


class InspirationImage(models.Model):
    tab = models.ForeignKey(InspirationTab, on_delete=models.CASCADE, related_name='images')
    image = models.URLField(max_length=500)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['tab__order', 'order']


class WhyChooseUsStat(models.Model):
    icon = models.CharField(max_length=20)
    value = models.CharField(max_length=150)
    description = models.CharField(max_length=300)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.value


class Calculator(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=200)
    cta = models.CharField(max_length=50, default='Calculate')
    image = models.URLField(max_length=500)
    icon = models.CharField(max_length=10, default='🏠')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


class Review(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    text = models.TextField()
    rating = models.PositiveSmallIntegerField(default=5)
    avatar = models.URLField(max_length=500)
    project_image = models.URLField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} — {self.rating}★'


class DeliveredHome(models.Model):
    title = models.CharField(max_length=200)
    location = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    image = models.URLField(max_length=500)
    cover_image = models.URLField(max_length=500)
    style = models.CharField(max_length=100)
    bhk_type = models.CharField(max_length=20)
    area_sqft = models.PositiveIntegerField()
    budget_min = models.PositiveIntegerField()
    budget_max = models.PositiveIntegerField()
    completed_date = models.DateField()

    class Meta:
        ordering = ['-completed_date']

    def __str__(self):
        return self.title


class ProcessStep(models.Model):
    step = models.PositiveSmallIntegerField(unique=True)
    title = models.CharField(max_length=100)
    description = models.TextField()

    class Meta:
        ordering = ['step']

    def __str__(self):
        return f'Step {self.step}: {self.title}'


class MagazineArticle(models.Model):
    title = models.CharField(max_length=300)
    author = models.CharField(max_length=100)
    author_avatar = models.URLField(max_length=500)
    date = models.CharField(max_length=50)
    read_time = models.PositiveSmallIntegerField()
    category = models.CharField(max_length=100)
    image = models.URLField(max_length=500)
    excerpt = models.TextField(blank=True)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-featured', '-created_at']

    def __str__(self):
        return self.title


class Design(models.Model):
    title = models.CharField(max_length=300)
    category = models.CharField(max_length=100)
    style = models.CharField(max_length=100)
    image = models.URLField(max_length=500)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


class Project(models.Model):
    title = models.CharField(max_length=300)
    city = models.CharField(max_length=100)
    bhk = models.CharField(max_length=20)
    area = models.CharField(max_length=50)
    budget = models.CharField(max_length=50)
    style = models.CharField(max_length=100)
    image = models.URLField(max_length=500)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.title


class Award(models.Model):
    title = models.CharField(max_length=200)
    icon = models.CharField(max_length=10)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


class FAQ(models.Model):
    question = models.CharField(max_length=400)
    answer = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.question[:80]


class Store(models.Model):
    name = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    address = models.TextField()
    phone = models.CharField(max_length=30)
    hours = models.CharField(max_length=100)
    image_url = models.URLField(max_length=500)
    latitude = models.FloatField()
    longitude = models.FloatField()

    class Meta:
        ordering = ['city', 'name']

    def __str__(self):
        return self.name


class TrendingProduct(models.Model):
    category = models.CharField(max_length=50)
    name = models.CharField(max_length=200)
    image = models.URLField(max_length=500)
    rating = models.FloatField()
    reviews = models.PositiveIntegerField()
    price = models.PositiveIntegerField()
    original_price = models.PositiveIntegerField()
    discount = models.PositiveSmallIntegerField(default=0)
    badge = models.CharField(max_length=50, blank=True, null=True)
    badge_variant = models.CharField(max_length=20, blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name


class Lead(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    city = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} ({self.phone}) — {self.city}'


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15, blank=True)
    city = models.CharField(max_length=100, blank=True)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} — {self.subject[:60]}'
