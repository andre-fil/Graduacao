import type { CourseBanner } from '../../../types';
import { getCourseCoverUrl } from '../../../utils/courseCovers';
import styles from './CourseBanners.module.css';

interface CourseBannersProps {
  banners: CourseBanner[];
  courseSlug: string;
}

export function CourseBanners({ banners, courseSlug }: CourseBannersProps) {
  if (banners.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="course-banners-heading">
      <h2 id="course-banners-heading" className={styles.title}>
        Promoções e destaques
      </h2>

      <div className={styles.list}>
        {banners.map((banner) => {
          const image = (
            <img
              src={getCourseCoverUrl(courseSlug)}
              alt={banner.alt}
              className={styles.image}
              loading="lazy"
            />
          );

          if (banner.href) {
            return (
              <a
                key={banner.id}
                href={banner.href}
                className={styles.banner}
                target="_blank"
                rel="noopener noreferrer"
              >
                {image}
              </a>
            );
          }

          return (
            <div key={banner.id} className={styles.banner}>
              {image}
            </div>
          );
        })}
      </div>
    </section>
  );
}
