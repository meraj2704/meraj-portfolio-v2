import { connectDB } from "@/lib/db";
import { Award, type AwardDoc } from "@/models/Award";
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

export default async function AwardsSection() {
  await connectDB();
  const items = await Award.find()
    .sort({ order: 1, createdAt: -1 })
    .lean<AwardDoc[]>();

  if (items.length === 0) return null;

  return (
    <section className={splitSection} id="awards">
      <div className={splitContainer}>
        <div className={splitTitleWrap}>
          <h2 className={splitTitle}>AWARDS</h2>
        </div>
        <div className={splitList}>
          {items.map((item) => (
            <div key={String(item._id)} className={splitItem}>
              <h3 className={splitItemTitle}>{item.award}</h3>
              <div className={splitItemMeta}>
                <span className={splitItemRole}>{item.project}</span>
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
