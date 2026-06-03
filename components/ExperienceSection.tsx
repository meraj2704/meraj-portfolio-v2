import { connectDB } from "@/lib/db";
import { Experience, type ExperienceDoc } from "@/models/Experience";
import {
  splitContainer,
  splitItem,
  splitItemDate,
  splitItemDesc,
  splitItemMeta,
  splitItemRole,
  splitItemTitle,
  splitList,
  splitSection,
  splitTitle,
  splitTitleWrap,
} from "./_shared/splitClasses";

export default async function ExperienceSection() {
  await connectDB();
  const items = await Experience.find()
    .sort({ order: 1, createdAt: -1 })
    .lean<ExperienceDoc[]>();

  if (items.length === 0) return null;

  return (
    <section className={splitSection} id="experience">
      <div className={splitContainer}>
        <div className={splitTitleWrap}>
          <h2 className={splitTitle}>EXPERIENCE</h2>
        </div>
        <div className={splitList}>
          {items.map((item) => (
            <div key={String(item._id)} className={splitItem}>
              <h3 className={splitItemTitle}>{item.company}</h3>
              <div className={splitItemMeta}>
                <span className={splitItemRole}>{item.role}</span>
                <span className={splitItemDate}>{item.date}</span>
              </div>
              {item.desc && (
                <div
                  className={splitItemDesc}
                  dangerouslySetInnerHTML={{ __html: item.desc }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
