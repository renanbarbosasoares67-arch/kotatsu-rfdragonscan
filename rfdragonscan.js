const source = {
  id: "rfdragonscan",
  name: "RF Dragon Scan",
  lang: "pt-BR",
  baseUrl: "https://rfdragonscan.com",

  async getMangaList(page) {
    const url = `${this.baseUrl}/novels/?page=${page}`;
    const doc = await fetchHtml(url);

    return doc.select(".page-item-detail").map(e => ({
      id: e.select("a").attr("href"),
      title: e.select(".h5").text(),
      cover: e.select("img").attr("src")
    }));
  },

  async getMangaDetails(id) {
    const doc = await fetchHtml(id);

    return {
      title: doc.select("h1").text(),
      description: doc.select(".summary__content").text(),
      cover: doc.select(".summary_image img").attr("src"),
      status: doc.select(".post-status").text()
    };
  },

  async getChapters(id) {
    const doc = await fetchHtml(id);

    return doc.select(".wp-manga-chapter a").map(e => ({
      id: e.attr("href"),
      title: e.text()
    }));
  },

  async getPages(id) {
    const doc = await fetchHtml(id);

    return doc.select(".reading-content img").map(img =>
      img.attr("src")
    );
  }
};

registerSource(source);
