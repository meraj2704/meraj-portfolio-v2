import Image from "next/image";
import { connectDB } from "@/lib/db";
import { normalizeRichHtml } from "@/lib/utils";
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
            <div key={String(item._id)} className={`${splitItem} group`}>
              <h3 className={splitItemTitle}>{item.award}</h3>
              <div className={splitItemMeta}>
                <span className={splitItemRole}>{item.project}</span>
                <span className={splitItemDate}>{item.date}</span>
              </div>
              {item.desc && (
                <div
                  className={splitItemDesc}
                  dangerouslySetInnerHTML={{ __html: normalizeRichHtml(item.desc) }}
                />
              )}
              {item.image?.url && (
                <div className="mt-5 relative w-full max-w-xl aspect-16/10 overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] shadow-[0_20px_40px_-24px_rgba(0,0,0,0.9)]">
                  <Image
                    src={item.image.url}
                    alt={`${item.award} — ${item.project}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
