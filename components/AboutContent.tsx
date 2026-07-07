import Image from "next/image";
import { renderInline } from "@/lib/inline";
import { about } from "@/content/about";

export function AboutContent() {
  return (
    <section className="grid items-stretch gap-10 md:grid-cols-2 md:gap-14">
      {/* Text */}
      <div className="order-2 flex max-w-[487px] flex-col md:order-1">
        <h1 className="text-[34px] font-semibold leading-[1.1] tracking-[-0.4px] text-headline">
          {about.headline}
        </h1>

        <div className="mt-8 flex flex-col gap-5 text-lg leading-[1.4] text-body">
          {about.paragraphs.map((paragraph, i) => (
            <p key={i}>{renderInline(paragraph)}</p>
          ))}
        </div>
      </div>

      {/* Portrait — no border-radius per design. Fixed aspect ratio on mobile
          (stacked layout, nothing to match height to); at md:+ it stretches
          to the grid row's height (i.e. the text column's height), and
          object-position keeps the subject (~30% from left in the source
          image) in frame as the crop reflows. */}
      <div className="relative order-1 aspect-[57/50] w-full overflow-hidden rounded-none md:order-2 md:aspect-auto md:h-full">
        <Image
          src={about.portrait.src}
          alt={about.portrait.alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 570px"
          className="object-cover object-[30%_50%]"
        />
      </div>
    </section>
  );
}
