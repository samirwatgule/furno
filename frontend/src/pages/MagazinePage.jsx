import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaNewspaper } from 'react-icons/fa';
import { ArticleSkeleton } from '../components/ui/Skeleton';
import useApi from '../hooks/useApi';
import { api } from '../services/api';
import { magazineArticles as fallbackArticles } from '../data/siteData';

const CATEGORIES = ['All', 'Room Ideas', 'Decor', 'Kitchen', 'Bedroom', 'Vastu', 'Expert Tips'];
const INITIAL_SHOW = 6;
const LOAD_MORE_COUNT = 3;

function ArticleCard({ article, index }) {
  return (
    <motion.a
      href="#"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 block"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={article.image} alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <span className="inline-block text-xs font-bold text-gold bg-gold-light px-2.5 py-1 rounded-full mb-3">
          {article.category}
        </span>
        <h3 className="text-sm font-semibold text-navy leading-snug line-clamp-2 group-hover:text-navy-light transition-colors">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="text-xs text-gray-600 mt-2 line-clamp-2">{article.excerpt}</p>
        )}
        <div className="flex items-center gap-2 mt-3">
          <img
            src={article.authorAvatar} alt={article.author}
            className="w-6 h-6 rounded-full object-cover flex-shrink-0"
            loading="lazy"
          />
          <span className="text-xs text-gray-500">{article.author}</span>
          <span className="text-gray-300">·</span>
          <span className="text-xs text-gray-500">{article.readTime} min read</span>
        </div>
        <p className="text-xs text-gold font-medium mt-3 group-hover:underline">Read Article →</p>
      </div>
    </motion.a>
  );
}

export default function MagazinePage() {
  const { data: allArticles, loading } = useApi(api.getArticles, fallbackArticles);
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(INITIAL_SHOW);

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(INITIAL_SHOW);
  }, [activeCategory]);

  const featuredArticle = activeCategory === 'All'
    ? (allArticles || []).find((a) => a.featured)
    : null;

  const gridArticles = useMemo(() => {
    return (allArticles || []).filter(
      (a) =>
        (activeCategory === 'All' || a.category === activeCategory) &&
        a !== featuredArticle
    );
  }, [activeCategory, featuredArticle]);

  const visibleArticles = gridArticles.slice(0, visibleCount);
  const hasMore = visibleCount < gridArticles.length;

  return (
    <>
      {/* ── HERO + CATEGORY TABS ── */}
      <section className="bg-navy py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-display)]"
          >
            Furno Magazine
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="mt-4 text-white/70 max-w-2xl mx-auto mb-8"
          >
            Expert advice, design ideas, and home improvement tips from India&apos;s leading interior designers
          </motion.p>

          {/* Category pills — scrollable on mobile */}
          <div
            className="flex gap-2 overflow-x-auto pb-2 justify-start sm:justify-center"
            style={{ scrollbarWidth: 'none' }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all flex-shrink-0 ${
                  activeCategory === cat
                    ? 'bg-gold text-white shadow-md'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED ARTICLE (All filter only) ── */}
      <AnimatePresence>
        {featuredArticle && (
          <motion.section
            key="featured"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="bg-gray-50"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
              <a href="#" className="block group relative overflow-hidden rounded-2xl shadow-xl">
                <div className="aspect-[21/9] sm:aspect-[21/8] overflow-hidden">
                  <img
                    src={featuredArticle.image} alt={featuredArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                {/* Dark overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                {/* Overlaid content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                  <span className="inline-block bg-gold text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                    {featuredArticle.category}
                  </span>
                  <h2 className="text-xl sm:text-3xl font-bold text-white font-[family-name:var(--font-display)] max-w-3xl leading-tight">
                    {featuredArticle.title}
                  </h2>
                  <div className="flex items-center flex-wrap gap-3 mt-3 text-white/70 text-xs">
                    <img src={featuredArticle.authorAvatar} alt="" className="w-6 h-6 rounded-full flex-shrink-0" />
                    <span>{featuredArticle.author}</span>
                    <span>·</span>
                    <span>{featuredArticle.readTime} min read</span>
                    <span>·</span>
                    <span>{featuredArticle.date}</span>
                  </div>
                </div>
              </a>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── ARTICLE GRID ── */}
      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(INITIAL_SHOW)].map((_, i) => <ArticleSkeleton key={i} />)}
            </div>
          ) : gridArticles.length === 0 ? (
            /* ── Empty state ── */
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <FaNewspaper className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-500">No articles in this category yet</h3>
              <button
                onClick={() => setActiveCategory('All')}
                className="mt-5 px-6 py-2.5 rounded-xl bg-gold text-white text-sm font-bold hover:bg-gold-hover transition-all"
              >
                Clear Filter
              </button>
            </motion.div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleArticles.map((article, i) => (
                  <ArticleCard key={article.id} article={article} index={i} />
                ))}
              </div>

              {/* ── Load More ── */}
              {hasMore && (
                <div className="text-center mt-12">
                  <button
                    onClick={() => setVisibleCount((c) => c + LOAD_MORE_COUNT)}
                    className="px-8 py-3.5 border-2 border-navy text-navy hover:bg-navy hover:text-white rounded-xl font-bold text-sm uppercase tracking-wide transition-all"
                  >
                    Load More Articles
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
