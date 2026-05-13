import useApi from '../../hooks/useApi';
import { api } from '../../services/api';
import { magazineArticles as fallbackArticles } from '../../data/siteData';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { CardSkeleton } from '../ui/Skeleton';

export default function Magazine() {
  const { data: articles, loading } = useApi(api.getArticles, fallbackArticles);
  const MotionLink = motion.create(Link);

  return (
    <section className="py-10 sm:py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-start sm:items-center justify-between mb-10 flex-col sm:flex-row gap-4"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy font-[family-name:var(--font-display)]">
              Find everything from design fixes to expert tips on Furno magazine
            </h2>
          </div>
          <Link to="/design-ideas" className="inline-flex items-center gap-1 text-navy text-sm font-semibold hover:gap-2 transition-all border border-navy px-5 py-2 rounded-lg hover:bg-navy hover:text-white flex-shrink-0">
            See More <HiArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(articles || []).map((article, i) => (
              <MotionLink
                key={article.id}
                to="/design-ideas"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <span className="inline-block text-xs font-semibold text-gold bg-gold-light px-2.5 py-0.5 rounded-full mb-2">
                    {article.category}
                  </span>
                  <h3 className="text-sm font-bold text-navy leading-snug group-hover:text-gold transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-3">
                    <span className="font-medium text-gray-500">{article.author}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span>{article.date}</span>
                  </div>
                </div>
              </MotionLink>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
