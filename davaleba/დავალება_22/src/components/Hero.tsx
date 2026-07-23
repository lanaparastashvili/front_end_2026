import six from "../assets/six.jpg";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[560px] items-end overflow-hidden sm:min-h-[620px] lg:min-h-[720px]"
      style={{
        background:
          "linear-gradient(180deg, #2a1150 0%, #6a2c8c 28%, #d9527c 52%, #ff8a5c 74%, #ffd08a 100%)",
      }}
    >
      <img
        src={six}
        alt="Grand Theft Auto VI"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </section>
  );
}
