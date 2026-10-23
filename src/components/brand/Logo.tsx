import Image from "next/image";

// Logo B (approved 23 Oct 2026). The SVG carries its own padding.
export function Logo({ dark = false, height = 52 }: { dark?: boolean; height?: number }) {
  const width = Math.round((height * 645) / 268);
  return (
    <Image
      src={dark ? "/brand/ebury-wordmark-dark.svg" : "/brand/ebury-wordmark.svg"}
      alt="Ebury Fire Systems"
      width={width}
      height={height}
      priority={!dark}
      unoptimized
      className="block"
    />
  );
}
