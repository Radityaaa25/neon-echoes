import { motion } from "framer-motion";

export function MessageOfLove() {
  return (
    <section id="message" className="py-32 md:py-48 px-6 md:px-16 max-w-4xl mx-auto text-center">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-xs tracking-[0.4em] text-neutral-500 uppercase mb-6"
      >
        — Birthday Note
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="font-serif italic text-5xl md:text-7xl lg:text-8xl text-foreground leading-[1.05] mb-12"
      >
        Untuk Cewek Favoritku
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 1 }}
        className="font-serif text-lg md:text-xl text-foreground/85 leading-relaxed space-y-6 text-left md:text-center"
      >
        <p>
          Happy birthday, Zalaaa. Hari ini bukan cuma soal nambah umur, tapi juga nambah chapter
          baru buat semua mimpi, rencana, dan hal-hal bagus yang lagi nunggu kamu di depan.
        </p>
        <p>
          Makasih udah jadi kamu: hangat, kuat, lucu, dan selalu bisa bikin hariku balik tenang
          cuma lewat obrolan sederhana.
        </p>
        <p>
          Semoga tahun ini ngasih kamu lebih banyak alasan buat senyum, lebih banyak peluang buat
          menang, dan lebih banyak momen yang bikin kamu bangga sama diri sendiri.
        </p>
        <p className="font-script text-3xl md:text-4xl text-primary pt-6">
          I am always on your team.
        </p>
      </motion.div>
    </section>
  );
}
