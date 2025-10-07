import Image, { type ImageProps } from "next/image";

type LogoProps = Omit<ImageProps, "src" | "alt">;

export const Logo = (props: LogoProps) => {
  const { className, ...rest } = props;
  return (
    <Image
      src="/logo.PNG"
      alt="SAIL Lab Logo"
      width={27}
      height={9}
      className={`object-contain ${className ?? ""}`}
      {...rest}
    />
  );
};
