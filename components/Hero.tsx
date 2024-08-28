import { Button as RelumeButton, ButtonProps } from "@relume_io/relume-ui";
import Link from 'next/link';
import { RxChevronRight } from "react-icons/rx";

type ImageProps = {
  src: string;
  alt?: string;
};

type CardBaseProps = {
  tagline: string;
  image: ImageProps;
  heading: string;
  description: string;
};

// Extend the ButtonProps instead of redefining it
type ExtendedButtonProps = ButtonProps & {
  title: string;
  href?: string;
};

type CardsSmallProps = CardBaseProps & {
  button?: ButtonProps;
};

type CardsBigProps = CardBaseProps & {
  buttons: ExtendedButtonProps[];
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  cardsSmall: CardsSmallProps[];
  cardsBig: CardsBigProps[];
};

export type Layout366Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

const Button = ({ href, ...props }: ButtonProps & { href?: string }) => {
  if (href) {
    return (
      <Link href={href} passHref target="_blank" rel="noopener noreferrer">
        <RelumeButton {...props} />
      </Link>
    );
  }
  return <RelumeButton {...props} />;
};

export const Hero = (props: Layout366Props) => {
  const { tagline, heading, description, cardsSmall, cardsBig } = {
    ...Layout366Defaults,
    ...props,
  } as Props;
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">{heading}</h2>
          <p className="md:text-md">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:gap-8 ">
          <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
            {cardsBig.map((card, index) => (
              <div
                key={index}
                className="order-first flex flex-col items-stretch border border-border-primary lg:order-none lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3"
              >
                <div>
                  <img src={card.image.src} alt={card.image.alt} className="w-full object-cover" />
                </div>
                <div className="block flex-1 flex-col items-stretch justify-center p-6 md:flex md:p-8 lg:p-12">
                  <div>
                    <p className="mb-2 font-semibold">{card.tagline}</p>
                    <h3 className="mb-5 text-4xl font-bold leading-[1.2] md:mb-6 md:text-5xl lg:text-6xl">
                      {card.heading}
                    </h3>
                    <p>{card.description}</p>
                  </div>
                  <div className="mt-6 flex items-center gap-4 md:mt-8">
                    {card.buttons.map((button, index) => (
                      <Button key={index} {...button}>
                        {button.title}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {cardsSmall.map((card, index) => (
              <div
                key={index}
                className="order-last flex flex-col items-stretch border border-border-primary md:grid md:grid-cols-2 lg:order-none"
              >
                <div className="flex w-full items-center justify-center">
                  <img src={card.image.src} alt={card.image.alt} className="w-full object-cover" />
                </div>
                <div className="block flex-col justify-center p-6 md:flex">
                  <div>
                    <p className="mb-2 font-semibold">{card.tagline}</p>
                    <h3 className="mb-2 text-xl font-bold md:text-2xl">{card.heading}</h3>
                    <p>{card.description}</p>
                  </div>
                  <div className="mt-5 flex items-center gap-4 md:mt-6">
                    {card.button && (
                      <Button
                        variant={card.button.variant}
                        size={card.button.size}
                        iconRight={card.button.iconRight}
                        iconLeft={card.button.iconLeft}
                      >
                        {card.button.title}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const Layout366Defaults: Layout366Props = {
  tagline: "Professionalism, Experience and Trust",
  heading: "Logo goes here",
  description: "Heynike Inc. is a specialist legal practice which takes pride in delivering professional work of uncompromising quality with personal attention to our clients and at a competitive rate.",
  cardsSmall: [
    {
      tagline: "Focused Expertise ",
      image: {
        src: "expertise.webp",
        alt: "Placeholder image 1",
      },
      heading: "Exception Results",
      description:
        "We have resisted the temptation of attempting to do all legal work and falling into the trap of mediocrity.",
    },
    {
      tagline: "Established in 1997",
      image: {
        src: "experience.webp",
        alt: "Placeholder image 2",
      },
      heading: "Over 35 years of experience",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      button: {
        title: "Button",
        variant: "link",
        size: "link",
        iconRight: <RxChevronRight />,
      },
    },
  ],
  cardsBig: [
    {
      tagline: "Proudly the first franchise",

      image: {
        src: "3.jpg",
        alt: "Placeholder image 3",
      },
      heading: "Founder of 3%.com Properties®",
      description:
        "As property lawyers, conveyancers and estate agents we offer you a complete and comprehensive property sale service from valuing, marketing, selling and transferring the property to finally paying the client.",
      buttons: [
        { title: "3%.com Properties®", variant: "secondary", href: "https://www.threepercent.com/"},
        // {
        //   title: "Button",
        //   variant: "link",
        //   size: "link",
        //   iconRight: <RxChevronRight />,
        // },
      ],
    },
  ],
};
