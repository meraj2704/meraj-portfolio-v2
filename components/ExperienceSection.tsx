import Image from "next/image";
import { connectDB } from "@/lib/db";
import { normalizeRichHtml } from "@/lib/utils";
import { Experience, type ExperienceDoc } from "@/models/Experience";
import {
  splitContainer,
  splitItem,
  splitItemDate,
  splitItemDesc,
  splitItemMeta,
  splitItemRole,
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
              <div className="flex items-center gap-4 mb-4">
                {item.logo?.url && (
                  <span className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                    <Image
                      src={item.logo.url}
                      alt={item.company}
                      width={30}
                      height={30}
                      className="object-contain"
                    />
                  </span>
                )}
                <h3 className="text-2xl font-bold text-white uppercase">{item.company}</h3>
              </div>
              <div className={splitItemMeta}>
                <span className="flex items-center gap-2">
                  <span className={splitItemRole}>{item.role}</span>
                  {item.workMode && (
                    <span className="text-[11px] font-bold tracking-wider text-white/60 uppercase border border-white/15 rounded-full px-2 py-0.5">
                      {item.workMode}
                    </span>
                  )}
                </span>
                <span className={splitItemDate}>{item.date}</span>
              </div>
              {item.desc && (
                <div
                  className={splitItemDesc}
                  dangerouslySetInnerHTML={{ __html: normalizeRichHtml(item.desc) }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
