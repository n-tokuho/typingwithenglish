/**
 * A single vocabulary entry: a somewhat difficult word from the sentence and
 * its short Japanese meaning.
 */
export type WordGloss = {
  word: string;
  meaning: string;
};

/**
 * A single typing target: an English sentence with its Japanese translation
 * and a short learning note explaining the key phrase or pattern.
 */
export type Sentence = {
  id: string;
  en: string;
  ja: string;
  /**
   * Short Japanese explanations of the idioms, patterns, or nuances in the
   * sentence — what to remember and when to use it. One entry per phrase, so a
   * sentence with two notable phrases has two entries (rendered one per line).
   */
  notes: string[];
  /**
   * Glosses for the harder words in the sentence (only the words worth looking
   * up — basic words are omitted). Empty when nothing is notable.
   */
  words: WordGloss[];
  /** Where the sentence comes from, for the learner's context. */
  source: "conversation" | "speech";
  /** For speech lines: who said it (and where). Omitted for conversation. */
  attribution?: string;
};

/**
 * Fixed list of sentences with Japanese translations, kept in-app so the game
 * works fully offline. The list mixes two kinds of practice material:
 *
 * - `conversation`: natural, intermediate-to-advanced everyday and workplace
 *   expressions — the kind of phrasing a fluent speaker actually uses, with
 *   richer grammar than textbook beginner lines.
 * - `speech`: short, well-known lines from famous speeches, quoted accurately,
 *   with the speaker noted in `attribution`.
 *
 * Every sentence carries `notes` explaining its key phrases or patterns so the
 * learner picks up reusable expressions, not just individual sentences.
 */
export const SENTENCES: Sentence[] = [
  // ===== Everyday & social conversation =====
  {
    id: "c01",
    en: "I was wondering if you could give me a hand with this later.",
    ja: "後でこれを手伝ってもらえないかと思っているのですが。",
    notes: [
      "「I was wondering if you could ~」は最も丁寧な依頼の型。",
      "give someone a hand = 手を貸す。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c02",
    en: "To be honest, I'm not entirely sure that's the best approach.",
    ja: "正直なところ、それが最善の方法だとは言い切れません。",
    notes: [
      "「To be honest, ~」で本音を切り出す。",
      "not entirely sure = 完全には確信がない、と婉曲に否定。",
    ],
    words: [
      { word: "entirely", meaning: "完全に" },
      { word: "approach", meaning: "方法・取り組み方" },
    ],
    source: "conversation",
  },
  {
    id: "c03",
    en: "Let me know if anything comes up and I'll rearrange my schedule.",
    ja: "何かあったら教えてください。予定を調整しますので。",
    notes: [
      "come up = (予定外のことが)持ち上がる。",
      "「Let me know if ~」は会話で頻出の申し出表現。",
    ],
    words: [
      { word: "rearrange", meaning: "並べ替える・組み直す" },
    ],
    source: "conversation",
  },
  {
    id: "c04",
    en: "I'd appreciate it if you could get back to me by the end of the day.",
    ja: "今日中にお返事いただけると助かります。",
    notes: [
      "「I'd appreciate it if you could ~」は丁寧な依頼。",
      "get back to someone = 後で返事をする。",
    ],
    words: [
      { word: "appreciate", meaning: "ありがたく思う" },
    ],
    source: "conversation",
  },
  {
    id: "c05",
    en: "Now that you mention it, I do remember hearing something about that.",
    ja: "そう言われてみれば、それについて何か聞いた覚えがあります。",
    notes: [
      "「Now that you mention it」 = そう言われてみれば。",
      "do remember の do は強調。",
    ],
    words: [
      { word: "mention", meaning: "言及する" },
    ],
    source: "conversation",
  },
  {
    id: "c06",
    en: "I don't mean to be rude, but we're running short on time.",
    ja: "失礼なつもりはありませんが、時間が押しています。",
    notes: [
      "「I don't mean to be ~, but」は言いにくいことの前置き。",
      "run short on = ~が不足してくる。",
    ],
    words: [
      { word: "rude", meaning: "失礼な" },
    ],
    source: "conversation",
  },
  {
    id: "c07",
    en: "It completely slipped my mind, so thanks for the reminder.",
    ja: "すっかり忘れていました。思い出させてくれてありがとう。",
    notes: [
      "slip one's mind = うっかり忘れる。",
      "forget より自然で言い訳がましさが少ない定番表現。",
    ],
    words: [
      { word: "completely", meaning: "完全に" },
      { word: "reminder", meaning: "思い出させるもの・催促" },
    ],
    source: "conversation",
  },
  {
    id: "c08",
    en: "Would you mind walking me through how this is supposed to work?",
    ja: "これがどう動くはずなのか、一通り説明してもらえますか?",
    notes: [
      "walk someone through = 手順を一つずつ説明する。",
      "be supposed to = ~することになっている。",
    ],
    words: [
      { word: "supposed", meaning: "~することになっている" },
    ],
    source: "conversation",
  },
  {
    id: "c09",
    en: "I see where you're coming from, but I have a slightly different take.",
    ja: "おっしゃることは分かりますが、私は少し違う見方をしています。",
    notes: [
      "see where someone is coming from = 相手の立場を理解する。",
      "take = (名詞で)見解・捉え方。",
    ],
    words: [
      { word: "slightly", meaning: "わずかに" },
    ],
    source: "conversation",
  },
  {
    id: "c10",
    en: "Let's circle back to this once everyone has had a chance to think it over.",
    ja: "みんなが考える時間を取れたら、この件に戻りましょう。",
    notes: [
      "circle back to = 後でその話題に戻る(ビジネス頻出)。",
      "think over = じっくり考える。",
    ],
    words: [
      { word: "chance", meaning: "機会" },
    ],
    source: "conversation",
  },
  {
    id: "c11",
    en: "I can't thank you enough for going out of your way to help.",
    ja: "わざわざ助けてくれて、感謝してもしきれません。",
    notes: [
      "can't ~ enough = いくら~してもし足りない。",
      "go out of one's way = わざわざ手間をかける。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c12",
    en: "If it's not too much trouble, could you double-check these numbers?",
    ja: "もしご面倒でなければ、この数字を再確認してもらえますか?",
    notes: [
      "「If it's not too much trouble」は依頼を和らげる前置き。",
      "double-check = 念のため再確認する。",
    ],
    words: [
      { word: "trouble", meaning: "面倒・手間" },
    ],
    source: "conversation",
  },
  {
    id: "c13",
    en: "I'd rather not commit to anything until I've looked into it further.",
    ja: "もう少し調べるまでは、何も確約したくありません。",
    notes: [
      "would rather not = むしろ~したくない。",
      "commit to = 確約する。",
      "look into = 調査する。",
    ],
    words: [
      { word: "commit", meaning: "確約する・専念する" },
      { word: "further", meaning: "さらに" },
    ],
    source: "conversation",
  },
  {
    id: "c14",
    en: "Come to think of it, we should probably loop in the rest of the team.",
    ja: "考えてみると、残りのチームにも共有しておくべきですね。",
    notes: [
      "「Come to think of it」 = そういえば、考えてみると。",
      "loop in = (人を)情報共有の輪に入れる。",
    ],
    words: [
      { word: "probably", meaning: "たぶん" },
      { word: "rest", meaning: "残り" },
    ],
    source: "conversation",
  },
  {
    id: "c15",
    en: "No matter how you look at it, the deadline is going to be tight.",
    ja: "どう見ても、締め切りは厳しくなりそうです。",
    notes: [
      "no matter how ~ = どんなに~でも。",
      "tight は日程・予算が「きつい」ときの定番語。",
    ],
    words: [
      { word: "deadline", meaning: "締め切り" },
      { word: "tight", meaning: "厳しい・余裕がない" },
    ],
    source: "conversation",
  },
  {
    id: "c16",
    en: "I'll take care of it, so there's no need to worry about a thing.",
    ja: "私が対応しますので、何も心配いりません。",
    notes: [
      "take care of it = それを引き受ける・対処する。",
      "not ~ a thing = 何一つ~ない、の強調。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c17",
    en: "Could we possibly push the meeting back by half an hour or so?",
    ja: "会議を30分ほど後ろにずらすことはできますか?",
    notes: [
      "push back = (予定を)後ろにずらす(反対は move up)。",
      "possibly で依頼を柔らかく。",
    ],
    words: [
      { word: "possibly", meaning: "もしかすると・できれば" },
    ],
    source: "conversation",
  },
  {
    id: "c18",
    en: "Honestly, I wasn't expecting it to turn out this well.",
    ja: "正直、こんなにうまくいくとは思っていませんでした。",
    notes: [
      "turn out = 結果的に~になる。",
      "this well = 「これほどうまく」と程度を示す this。",
    ],
    words: [
      { word: "expecting", meaning: "予期する(expect)" },
    ],
    source: "conversation",
  },
  {
    id: "c19",
    en: "Feel free to reach out if you ever need a second opinion.",
    ja: "別の意見が必要になったら、いつでも気軽に連絡してください。",
    notes: [
      "feel free to = 遠慮なく~してよい。",
      "reach out = 連絡を取る。",
      "a second opinion = 別の人の意見。",
    ],
    words: [
      { word: "opinion", meaning: "意見" },
    ],
    source: "conversation",
  },
  {
    id: "c20",
    en: "I'm afraid that doesn't quite work for me, but I'm open to other ideas.",
    ja: "あいにくそれは少し都合が悪いのですが、他の案には前向きです。",
    notes: [
      "「I'm afraid ~」は残念な事実を伝える前置き。",
      "work for me = 自分に都合がよい。",
      "open to = ~に前向き。",
    ],
    words: [
      { word: "quite", meaning: "かなり" },
    ],
    source: "conversation",
  },
  {
    id: "c21",
    en: "Let's play it by ear and decide once we see how things go.",
    ja: "様子を見ながら、状況次第で決めましょう。",
    notes: ["play it by ear = 計画を立てず臨機応変にやる(元は楽譜なしで演奏する意)。"],
    words: [
      { word: "decide", meaning: "決める" },
    ],
    source: "conversation",
  },
  {
    id: "c22",
    en: "I hate to bother you, but do you have a minute to spare?",
    ja: "お忙しいところ恐縮ですが、少しお時間ありますか?",
    notes: [
      "「I hate to bother you, but」は声をかける際の丁寧な前置き。",
      "to spare = 余分の・割ける。",
    ],
    words: [
      { word: "bother", meaning: "煩わせる" },
      { word: "spare", meaning: "割く・余分の" },
    ],
    source: "conversation",
  },
  {
    id: "c23",
    en: "On second thought, maybe we should sleep on it before deciding.",
    ja: "考え直すと、決める前に一晩おいたほうがいいかもしれません。",
    notes: [
      "on second thought = やはり考え直すと。",
      "sleep on it = 即決せず一晩考える。",
    ],
    words: [
      { word: "deciding", meaning: "決める(decide)" },
    ],
    source: "conversation",
  },
  {
    id: "c24",
    en: "I just wanted to make sure we're all on the same page.",
    ja: "全員の認識が揃っているか確認したかっただけです。",
    notes: [
      "be on the same page = 認識・理解が一致している。",
      "make sure = 確認する。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c25",
    en: "It's been ages since we last caught up, so let's not leave it so long again.",
    ja: "前に近況を話してからずいぶん経つので、次はそんなに間を空けないようにしましょう。",
    notes: [
      "It's been ages since ~ = ~してからずいぶん経つ。",
      "catch up = 近況を報告し合う。",
    ],
    words: [
      { word: "ages", meaning: "長い間" },
    ],
    source: "conversation",
  },
  {
    id: "c26",
    en: "I'd hate to keep you, so I'll let you get back to what you were doing.",
    ja: "お引き止めしては悪いので、作業に戻ってください。",
    notes: [
      "keep someone = 人を引き止める。",
      "会話を切り上げる際の丁寧な決まり文句。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c27",
    en: "As far as I'm concerned, you've more than earned a break.",
    ja: "私に言わせれば、あなたは休憩を取って当然です。",
    notes: [
      "as far as I'm concerned = 私の考えでは。",
      "more than earned = 十分すぎるほど値する。",
    ],
    words: [
      { word: "concerned", meaning: "関係している・気にかける" },
      { word: "earned", meaning: "獲得した(earn)" },
    ],
    source: "conversation",
  },
  {
    id: "c28",
    en: "Let's touch base early next week to see where things stand.",
    ja: "来週の早いうちに連絡を取り合って、状況を確認しましょう。",
    notes: [
      "touch base = 軽く連絡を取り合う(野球由来)。",
      "where things stand = 状況がどうなっているか。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c29",
    en: "I'm inclined to agree, though I'd like to hear the others out first.",
    ja: "賛成寄りですが、まず他の人の意見も聞きたいです。",
    notes: [
      "be inclined to = ~する気持ちに傾いている。",
      "hear someone out = 最後まで話を聞く。",
    ],
    words: [
      { word: "inclined", meaning: "~する気がある・傾いている" },
    ],
    source: "conversation",
  },
  {
    id: "c30",
    en: "Don't take this the wrong way, but I think you're overthinking it.",
    ja: "悪く取らないでほしいのですが、考えすぎだと思います。",
    notes: [
      "take it the wrong way = 悪く受け取る。",
      "overthink = 考えすぎる。",
      "指摘を和らげる前置き。",
    ],
    words: [
      { word: "overthinking", meaning: "考えすぎる(overthink)" },
    ],
    source: "conversation",
  },
  {
    id: "c31",
    en: "I'll cut to the chase: we need to make a decision today.",
    ja: "単刀直入に言うと、今日決断する必要があります。",
    notes: ["cut to the chase = 前置きを省いて本題に入る(映画のカット由来)。"],
    words: [
      { word: "decision", meaning: "決断" },
    ],
    source: "conversation",
  },
  {
    id: "c32",
    en: "That said, I'm willing to give it a shot if everyone's on board.",
    ja: "とはいえ、みんなが乗り気なら試してみてもいいです。",
    notes: [
      "that said = とはいえ(直前の内容を一部覆す)。",
      "give it a shot = 試しにやってみる。",
      "on board = 賛同して。",
    ],
    words: [
      { word: "willing", meaning: "~するのをいとわない" },
    ],
    source: "conversation",
  },
  {
    id: "c33",
    en: "I owe you one for covering for me while I was out.",
    ja: "留守中にカバーしてくれて、借りができました。",
    notes: [
      "I owe you one = 一つ借りができた。",
      "cover for someone = 人の代わりを務める。",
    ],
    words: [
      { word: "covering", meaning: "代わりを務める(cover)" },
    ],
    source: "conversation",
  },
  {
    id: "c34",
    en: "Let's not jump to conclusions until we have all the facts.",
    ja: "すべての事実がそろうまで、結論を急ぐのはやめましょう。",
    notes: ["jump to conclusions = 早合点する・結論に飛びつく。"],
    words: [
      { word: "conclusions", meaning: "結論(conclusion)" },
      { word: "facts", meaning: "事実(fact)" },
    ],
    source: "conversation",
  },
  {
    id: "c35",
    en: "I'm swamped at the moment, but I should be free by Thursday.",
    ja: "今は手一杯ですが、木曜には空くはずです。",
    notes: [
      "be swamped = 仕事に忙殺される。",
      "should = 「~のはず」という見込み。",
    ],
    words: [
      { word: "swamped", meaning: "忙殺された" },
    ],
    source: "conversation",
  },
  {
    id: "c36",
    en: "Whatever works best for you is fine by me.",
    ja: "あなたの都合のいいようにしてもらって構いません。",
    notes: [
      "whatever works for you = あなたの都合のいいもので。",
      "fine by me = 私は構わない。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c37",
    en: "I might be wrong, but it sounds like there's been a misunderstanding.",
    ja: "間違っているかもしれませんが、何か行き違いがあったようです。",
    notes: [
      "「I might be wrong, but」は断定を避ける前置き。",
      "it sounds like = ~のように聞こえる。",
    ],
    words: [
      { word: "misunderstanding", meaning: "誤解" },
    ],
    source: "conversation",
  },
  {
    id: "c38",
    en: "Let me get this straight: you want me to start over from scratch?",
    ja: "確認させてください。最初からやり直せということですか?",
    notes: [
      "get this straight = きちんと確認・整理する。",
      "from scratch = ゼロから。",
    ],
    words: [
      { word: "scratch", meaning: "最初・ゼロ" },
    ],
    source: "conversation",
  },
  {
    id: "c39",
    en: "I'll keep that in mind the next time something like this comes up.",
    ja: "次に似たことがあったら、それを念頭に置いておきます。",
    notes: [
      "keep ~ in mind = ~を心に留めておく。",
      "come up = (状況が)持ち上がる。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c40",
    en: "It's a long story, but the short version is that everything worked out.",
    ja: "話せば長いのですが、要するに、すべて丸く収まりました。",
    notes: [
      "It's a long story = 話せば長い。",
      "the short version = かいつまんで言うと。",
      "work out = うまくいく。",
    ],
    words: [],
    source: "conversation",
  },

  // ===== Famous speeches (accurate quotes) =====
  {
    id: "s01",
    en: "Ask not what your country can do for you; ask what you can do for your country.",
    ja: "国があなたに何をしてくれるかではなく、あなたが国に何をできるかを問いなさい。",
    notes: [
      "「Ask not ~」は古風な命令形(=Do not ask)。",
      "前後で対句を成す修辞(対照法)。",
    ],
    words: [],
    source: "speech",
    attribution: "John F. Kennedy, Inaugural Address (1961)",
  },
  {
    id: "s02",
    en: "I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin.",
    ja: "私には夢がある。いつか私の四人の幼い子供たちが、肌の色で判断されない国に暮らすという夢が。",
    notes: [
      "I have a dream that ~ の that は dream の内容を説明する同格節。",
      "where は nation を修飾する関係副詞。",
    ],
    words: [
      { word: "nation", meaning: "国家" },
      { word: "judged", meaning: "判断される(judge)" },
    ],
    source: "speech",
    attribution: "Martin Luther King Jr., I Have a Dream (1963)",
  },
  {
    id: "s03",
    en: "The only thing we have to fear is fear itself.",
    ja: "我々が恐れるべき唯一のものは、恐怖そのものである。",
    notes: [
      "have to fear = 恐れなければならない。",
      "fear itself の itself は「恐怖そのもの」と強調する再帰代名詞。",
    ],
    words: [
      { word: "fear", meaning: "恐怖・恐れる" },
    ],
    source: "speech",
    attribution: "Franklin D. Roosevelt, Inaugural Address (1933)",
  },
  {
    id: "s04",
    en: "Stay hungry, stay foolish.",
    ja: "ハングリーであれ、愚か者であれ。",
    notes: [
      "stay+形容詞 = その状態を保て。",
      "短い命令の反復でスローガン化した名句。",
    ],
    words: [
      { word: "foolish", meaning: "愚かな" },
    ],
    source: "speech",
    attribution: "Steve Jobs, Stanford Commencement (2005)",
  },
  {
    id: "s05",
    en: "Your time is limited, so don't waste it living someone else's life.",
    ja: "時間は限られている。だから他人の人生を生きて無駄にしてはいけない。",
    notes: [
      "waste it doing = ~して(時間を)無駄にする。",
      "someone else's = 他人の。",
    ],
    words: [
      { word: "limited", meaning: "限られた" },
      { word: "waste", meaning: "無駄にする" },
    ],
    source: "speech",
    attribution: "Steve Jobs, Stanford Commencement (2005)",
  },
  {
    id: "s06",
    en: "We choose to go to the Moon in this decade and do the other things, not because they are easy, but because they are hard.",
    ja: "我々はこの十年で月へ行くと決めた。それが容易だからではなく、困難だからこそ挑むのだ。",
    notes: [
      "not because ~ but because ~ = ~だからではなく~だから。",
      "理由を対比する強調構文。",
    ],
    words: [
      { word: "decade", meaning: "10年間" },
    ],
    source: "speech",
    attribution: "John F. Kennedy, Rice University (1962)",
  },
  {
    id: "s07",
    en: "Never give in, never give in, never, never, never, in nothing great or small.",
    ja: "決して屈するな、決して屈するな、決して、決して、決して。大事であれ些事であれ。",
    notes: [
      "give in = 屈する・降参する。",
      "never の反復で強い意志を表す(反復法)。",
    ],
    words: [],
    source: "speech",
    attribution: "Winston Churchill, Harrow School (1941)",
  },
  {
    id: "s08",
    en: "The future belongs to those who believe in the beauty of their dreams.",
    ja: "未来は、自分の夢の美しさを信じる人のものである。",
    notes: [
      "belong to = ~のものである。",
      "those who ~ = ~する人々。",
      "believe in = (価値・存在を)信じる。",
    ],
    words: [
      { word: "belongs", meaning: "属する(belong)" },
      { word: "beauty", meaning: "美しさ" },
    ],
    source: "speech",
    attribution: "attributed to Eleanor Roosevelt",
  },
  {
    id: "s09",
    en: "It always seems impossible until it's done.",
    ja: "何事も、成し遂げるまでは不可能に思えるものだ。",
    notes: [
      "seem+形容詞 = ~に思える。",
      "until it's done = それが成されるまでは。",
    ],
    words: [
      { word: "impossible", meaning: "不可能な" },
    ],
    source: "speech",
    attribution: "Nelson Mandela",
  },
  {
    id: "s10",
    en: "Education is the most powerful weapon which you can use to change the world.",
    ja: "教育は、世界を変えるために使える最も強力な武器である。",
    notes: [
      "which 以下は weapon を修飾する関係詞節。",
      "to change = 目的を表す不定詞(~するために)。",
    ],
    words: [
      { word: "powerful", meaning: "強力な" },
      { word: "weapon", meaning: "武器" },
    ],
    source: "speech",
    attribution: "Nelson Mandela",
  },
  {
    id: "s11",
    en: "We must learn to live together as brothers or perish together as fools.",
    ja: "我々は兄弟として共に生きることを学ぶか、愚か者として共に滅びるかだ。",
    notes: [
      "learn to ~ or perish = ~を学ぶか、さもなくば滅びる。",
      "as = ~として。",
      "二者択一を迫る構文。",
    ],
    words: [
      { word: "perish", meaning: "滅びる・死ぬ" },
      { word: "fools", meaning: "愚か者(fool)" },
    ],
    source: "speech",
    attribution: "Martin Luther King Jr.",
  },
  {
    id: "s12",
    en: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    ja: "成功は決定的ではなく、失敗も致命的ではない。大切なのは続ける勇気である。",
    notes: [
      "it is ~ that counts は強調構文(count = 重要である)。",
      "final/fatal の頭韻にも注目。",
    ],
    words: [
      { word: "fatal", meaning: "致命的な" },
      { word: "courage", meaning: "勇気" },
    ],
    source: "speech",
    attribution: "attributed to Winston Churchill",
  },
  {
    id: "s13",
    en: "I am not afraid of storms, for I am learning how to sail my ship.",
    ja: "私は嵐を恐れない。自分の船の操り方を学んでいるのだから。",
    notes: [
      "for は「というのは~だから」と理由を補足する接続詞(やや文語的)。",
      "how to ~ = ~の仕方。",
    ],
    words: [
      { word: "storms", meaning: "嵐(storm)" },
      { word: "sail", meaning: "航行する・帆走する" },
    ],
    source: "speech",
    attribution: "Louisa May Alcott, Little Women",
  },
  {
    id: "s14",
    en: "In the end, it's not the years in your life that count; it's the life in your years.",
    ja: "結局、大切なのは生きた年数ではなく、その年月にどれだけの生があったかだ。",
    notes: [
      "it's ~ that count の強調構文。",
      "years in your life と life in your years の語順反転(交差配語法)。",
    ],
    words: [
      { word: "count", meaning: "重要である・数える" },
    ],
    source: "speech",
    attribution: "attributed to Abraham Lincoln",
  },
  {
    id: "s15",
    en: "Darkness cannot drive out darkness; only light can do that.",
    ja: "闇は闇を追い払えない。それができるのは光だけだ。",
    notes: [
      "drive out = 追い払う。",
      "only ~ can = ~だけが…できる、と限定。",
      "do that で前文の動作を受ける。",
    ],
    words: [
      { word: "darkness", meaning: "闇" },
      { word: "drive out", meaning: "追い払う" },
    ],
    source: "speech",
    attribution: "Martin Luther King Jr.",
  },
  {
    id: "c41",
    en: "I'll loop you in once we've ironed out the details.",
    ja: "詳細を詰めたら、あなたにも共有しますね。",
    notes: [
      "loop someone in = (人)を情報共有の輪に入れる。",
      "iron out = (問題や詳細を)詰める、解決する。",
    ],
    words: [
      { word: "iron out", meaning: "詰める、解決する" },
    ],
    source: "conversation",
  },
  {
    id: "c42",
    en: "Could you give me a ballpark figure before we commit to anything?",
    ja: "何かを決める前に、おおよその金額を教えてもらえますか。",
    notes: [
      "ballpark figure = おおよその数字、概算。",
      "commit to = ~に確約する、本格的に取り組む。",
    ],
    words: [
      { word: "ballpark", meaning: "おおよその、概算の" },
      { word: "commit", meaning: "確約する、決める(commit)" },
    ],
    source: "conversation",
  },
  {
    id: "c43",
    en: "Had I known about the deadline, I would have started earlier.",
    ja: "締め切りを知っていたら、もっと早く始めていたのに。",
    notes: [
      "Had I known = If I had knownの倒置による仮定法過去完了。",
      "would have started = (過去の事実に反する)~していただろう。",
    ],
    words: [
      { word: "deadline", meaning: "締め切り" },
    ],
    source: "conversation",
  },
  {
    id: "c44",
    en: "Let's table this discussion until everyone's had a chance to review it.",
    ja: "全員が目を通せるまで、この議論は一旦保留にしましょう。",
    notes: [
      "table a discussion = (議論を)一旦保留にする。",
      "have a chance to = ~する機会を得る。",
    ],
    words: [
      { word: "table", meaning: "保留にする、棚上げする(table)" },
    ],
    source: "conversation",
  },
  {
    id: "c45",
    en: "I'm just going to bounce a few ideas off you, if that's okay.",
    ja: "もしよければ、いくつかアイデアをあなたに相談させてもらいますね。",
    notes: [
      "bounce ideas off someone = (人)に意見を聞いてもらう、考えを試す。",
    ],
    words: [
      { word: "bounce", meaning: "(意見を)ぶつける、試す(bounce)" },
    ],
    source: "conversation",
  },
  {
    id: "c46",
    en: "Generally speaking, the warranty covers anything but accidental damage.",
    ja: "一般的に言うと、保証は不慮の損傷以外なら何でもカバーします。",
    notes: [
      "Generally speaking = 一般的に言えば(分詞構文の慣用表現)。",
      "anything but = ~以外の何でも。",
    ],
    words: [
      { word: "warranty", meaning: "保証(書)" },
      { word: "accidental", meaning: "偶発的な、不慮の" },
    ],
    source: "conversation",
  },
  {
    id: "c47",
    en: "I'd hate to put you on the spot, but what's your honest take?",
    ja: "困らせるつもりはないんですが、率直な意見はどうですか。",
    notes: [
      "put someone on the spot = (人)を困らせる、即答を迫る。",
      "take = (名詞で)見解、意見。",
    ],
    words: [
      { word: "honest", meaning: "率直な、正直な" },
    ],
    source: "conversation",
  },
  {
    id: "c48",
    en: "We seem to have gotten our wires crossed about the venue.",
    ja: "会場について、どうやら私たちの間で行き違いがあったようですね。",
    notes: [
      "get one's wires crossed = (人同士で)話が食い違う、誤解する。",
    ],
    words: [
      { word: "venue", meaning: "会場、開催地" },
    ],
    source: "conversation",
  },
  {
    id: "c49",
    en: "Bear with me for a second while I pull up the file.",
    ja: "ファイルを開く間、少しだけお待ちください。",
    notes: [
      "bear with me = (少しの間)我慢して待ってください。",
      "pull up = (画面に)呼び出す、表示する。",
    ],
    words: [
      { word: "pull up", meaning: "(画面に)表示する" },
    ],
    source: "conversation",
  },
  {
    id: "c50",
    en: "I don't want to step on anyone's toes by taking over the project.",
    ja: "プロジェクトを引き継ぐことで、誰かの気分を害したくないんです。",
    notes: [
      "step on someone's toes = (人)の領分を侵す、気分を害する。",
      "take over = 引き継ぐ、引き受ける。",
    ],
    words: [
      { word: "take over", meaning: "引き継ぐ" },
    ],
    source: "conversation",
  },
  {
    id: "c51",
    en: "Let's hammer out the budget before we move on to staffing.",
    ja: "人員配置の話に移る前に、予算をきっちり詰めましょう。",
    notes: [
      "hammer out = (粘り強く議論して)まとめ上げる、詰める。",
      "move on to = ~に移る、次に進む。",
    ],
    words: [
      { word: "staffing", meaning: "人員配置" },
    ],
    source: "conversation",
  },
  {
    id: "c52",
    en: "I'll have to take a rain check on dinner; something came up.",
    ja: "急用ができたので、夕食はまた今度にさせてください。",
    notes: [
      "take a rain check = (誘いを)また今度にする、延期する。",
      "something came up = 急用ができた。",
    ],
    words: [
      { word: "rain check", meaning: "次回への延期" },
    ],
    source: "conversation",
  },
  {
    id: "c53",
    en: "Were I in your shoes, I'd sleep on it before deciding.",
    ja: "私があなたの立場なら、決める前に一晩考えますね。",
    notes: [
      "Were I in your shoes = If I were in your shoesの倒置の仮定法。",
      "sleep on it = (即決せず)一晩考える。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c54",
    en: "Thanks for going out of your way to help me move.",
    ja: "わざわざ引っ越しを手伝ってくれてありがとう。",
    notes: [
      "go out of one's way = わざわざ~する、骨を折る。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c55",
    en: "I'm sorry for the mix-up; I'll have it sorted out right away.",
    ja: "手違いがあって申し訳ありません、すぐに対応します。",
    notes: [
      "mix-up = 手違い、混乱。",
      "have it sorted out = それを片付ける、解決する(使役のhave)。",
    ],
    words: [
      { word: "mix-up", meaning: "手違い、混同" },
    ],
    source: "conversation",
  },
  {
    id: "c56",
    en: "Could you ballpark how long the renovation is likely to take?",
    ja: "改装にだいたいどれくらいかかりそうか、見積もってもらえますか。",
    notes: [
      "ballpark = (動詞で)おおよそ見積もる。",
      "be likely to = ~しそうである。",
    ],
    words: [
      { word: "renovation", meaning: "改装、改修" },
    ],
    source: "conversation",
  },
  {
    id: "c57",
    en: "I hate to be the bearer of bad news, but the shipment's delayed.",
    ja: "悪い知らせを伝えるのは気が引けますが、出荷が遅れています。",
    notes: [
      "the bearer of bad news = 悪い知らせを伝える人。",
    ],
    words: [
      { word: "bearer", meaning: "運ぶ人、伝える人" },
      { word: "shipment", meaning: "出荷、発送品" },
    ],
    source: "conversation",
  },
  {
    id: "c58",
    en: "Let's not bite off more than we can chew with this launch.",
    ja: "今回のローンチでは、身の丈を超えたことに手を出すのはやめましょう。",
    notes: [
      "bite off more than one can chew = 手に負えないことに手を出す。",
    ],
    words: [
      { word: "launch", meaning: "(製品などの)開始、発売" },
    ],
    source: "conversation",
  },
  {
    id: "c59",
    en: "I'll touch base with the vendor and see where things stand.",
    ja: "業者に連絡を取って、状況がどうなっているか確認します。",
    notes: [
      "see where things stand = 状況がどうなっているか確認する。",
    ],
    words: [
      { word: "vendor", meaning: "業者、販売元" },
    ],
    source: "conversation",
  },
  {
    id: "c60",
    en: "Would it be possible to bump our reservation to seven instead?",
    ja: "予約を代わりに7時にずらすことは可能でしょうか。",
    notes: [
      "bump (a reservation) = (予約などを)別の時間に動かす。",
      "instead = (前述の代わりに)代わりに。",
    ],
    words: [
      { word: "reservation", meaning: "予約" },
    ],
    source: "conversation",
  },
  {
    id: "c61",
    en: "Given the circumstances, I think we've done remarkably well.",
    ja: "状況を考えれば、私たちは驚くほどよくやったと思います。",
    notes: [
      "Given the circumstances = 状況を考慮すると(分詞構文)。",
      "remarkably = 著しく、驚くほど。",
    ],
    words: [
      { word: "circumstances", meaning: "状況、事情" },
      { word: "remarkably", meaning: "著しく、驚くほど" },
    ],
    source: "conversation",
  },
  {
    id: "c62",
    en: "I can't make heads or tails of these assembly instructions.",
    ja: "この組み立て説明書がまったく理解できません。",
    notes: [
      "can't make heads or tails of = ~がさっぱり理解できない。",
    ],
    words: [
      { word: "assembly", meaning: "組み立て" },
    ],
    source: "conversation",
  },
  {
    id: "c63",
    en: "Let's split the bill; it'll be easier than working out who had what.",
    ja: "割り勘にしましょう、誰が何を頼んだか計算するより楽ですから。",
    notes: [
      "split the bill = 割り勘にする。",
      "work out = (計算して)割り出す、解決する。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c64",
    en: "I'll run it by my manager and circle back to you tomorrow.",
    ja: "上司に確認して、明日改めてご連絡します。",
    notes: [
      "run something by someone = (確認のため人)に意見を聞く、伝える。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c65",
    en: "It's not really my cup of tea, but I'll tag along anyway.",
    ja: "あまり好みではないけど、とりあえず一緒に行きますよ。",
    notes: [
      "not one's cup of tea = (人の)好みではない。",
      "tag along = (人)について行く、同行する。",
    ],
    words: [
      { word: "tag along", meaning: "ついて行く、同行する" },
    ],
    source: "conversation",
  },
  {
    id: "c66",
    en: "Let me play devil's advocate for a moment and poke a few holes in this.",
    ja: "少しあえて反対の立場をとって、この案の穴を指摘させてください。",
    notes: [
      "play devil's advocate = あえて反対意見を述べる。",
      "poke holes in = (議論などの)穴を指摘する、粗探しをする。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c67",
    en: "I'm sorry, but you've caught me at a bad time right now.",
    ja: "すみません、今ちょっと取り込み中なんです。",
    notes: [
      "catch someone at a bad time = (人)の都合が悪いときに声をかける。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c68",
    en: "We should nip this issue in the bud before it escalates.",
    ja: "この問題は大きくなる前に、早めに芽を摘んでおくべきです。",
    notes: [
      "nip something in the bud = (問題を)初期のうちに摘む。",
      "escalate = (事態が)悪化する、拡大する。",
    ],
    words: [
      { word: "escalate", meaning: "悪化する、拡大する" },
    ],
    source: "conversation",
  },
  {
    id: "c69",
    en: "Off the top of my head, I'd say we have about thirty left.",
    ja: "ぱっと思いつく限りでは、残りは30くらいだと思います。",
    notes: [
      "off the top of one's head = (調べず)とっさに、思いつきで。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c70",
    en: "Judging by his tone, I don't think the meeting went well.",
    ja: "彼の口ぶりから判断すると、会議はうまくいかなかったようです。",
    notes: [
      "Judging by = ~から判断すると(分詞構文の慣用表現)。",
      "tone = 口調、語気。",
    ],
    words: [
      { word: "tone", meaning: "口調、語気" },
    ],
    source: "conversation",
  },
  {
    id: "c71",
    en: "Could you cut me some slack? I've been swamped all week.",
    ja: "少し大目に見てもらえませんか、今週ずっと忙しくて。",
    notes: [
      "cut someone some slack = (人)を大目に見る、手加減する。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c72",
    en: "Let's iron things out face to face rather than over email.",
    ja: "メールではなく、直接会って問題を解決しましょう。",
    notes: [
      "face to face = 直接会って、対面で。",
      "rather than = ~よりむしろ。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c73",
    en: "I'd be lying if I said I wasn't a little disappointed.",
    ja: "少しもがっかりしていないと言えば、嘘になります。",
    notes: [
      "I'd be lying if I said = ~と言えば嘘になる(仮定法)。",
    ],
    words: [
      { word: "disappointed", meaning: "がっかりした、失望した" },
    ],
    source: "conversation",
  },
  {
    id: "c74",
    en: "Why don't we touch on the budget briefly before we wrap up?",
    ja: "終わる前に、予算について少しだけ触れておきませんか。",
    notes: [
      "touch on = (話題に)軽く触れる。",
      "wrap up = (会議などを)締めくくる、終える。",
    ],
    words: [
      { word: "wrap up", meaning: "締めくくる、終える" },
    ],
    source: "conversation",
  },
  {
    id: "c75",
    en: "I'll keep you posted as soon as I hear back from them.",
    ja: "先方から返事があり次第、随時お知らせします。",
    notes: [
      "keep someone posted = (人)に逐一知らせる。",
      "hear back from = ~から返事をもらう。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c76",
    en: "Let's ditch the cab and walk; it's only a stone's throw away.",
    ja: "タクシーはやめて歩きましょう、すぐ目と鼻の先ですから。",
    notes: [
      "a stone's throw away = ごく近い距離、目と鼻の先。",
      "ditch = (口語で)~をやめる、捨てる。",
    ],
    words: [
      { word: "ditch", meaning: "やめる、捨てる(ditch)" },
    ],
    source: "conversation",
  },
  {
    id: "c77",
    en: "I'll go ahead and book it, unless you'd rather hold off.",
    ja: "保留にしたいのでなければ、このまま予約を進めますね。",
    notes: [
      "go ahead and = (ためらわず)~してしまう、進める。",
      "hold off = (行動を)先延ばしにする、控える。",
    ],
    words: [
      { word: "hold off", meaning: "先延ばしにする、控える" },
    ],
    source: "conversation",
  },
  {
    id: "c78",
    en: "To put it bluntly, the proposal just doesn't add up financially.",
    ja: "率直に言うと、その提案は財務的にどうも筋が通りません。",
    notes: [
      "to put it bluntly = 率直に言えば、はっきり言うと。",
      "add up = 辻褄が合う、筋が通る。",
    ],
    words: [
      { word: "bluntly", meaning: "率直に、ぶっきらぼうに" },
      { word: "proposal", meaning: "提案、企画" },
    ],
    source: "conversation",
  },
  {
    id: "c79",
    en: "Don't worry about it; these things happen to the best of us.",
    ja: "気にしないで、こういうことは誰にでもあることですから。",
    notes: [
      "these things happen = よくあることだ、仕方ない。",
      "the best of us = (どんなに優秀でも)誰にでも。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c80",
    en: "Once the dust settles, let's grab coffee and catch up properly.",
    ja: "落ち着いたら、コーヒーでも飲んでちゃんと近況を話しましょう。",
    notes: [
      "once the dust settles = (騒ぎが)落ち着いたら、ほとぼりが冷めたら。",
      "catch up = 近況を語り合う、追いつく。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c81",
    en: "Don't be so hard on yourself; everyone slips up once in a while.",
    ja: "そんなに自分を責めないで、誰だってたまには失敗するものだよ。",
    notes: [
      "be hard on oneself = 自分に厳しくする、自分を責める。",
      "slip up = (うっかり)ミスをする。",
      "once in a while = たまに、時々。",
    ],
    words: [
      { word: "slip up", meaning: "へまをする、ミスをする" },
    ],
    source: "conversation",
  },
  {
    id: "c82",
    en: "I get where you're coming from, but I still think we should wait.",
    ja: "言いたいことは分かるけど、それでもやっぱり待つべきだと思うな。",
    notes: [
      "I get where you're coming from = あなたの言い分は分かる、立場は理解できる。",
      "意見に一定の理解を示しつつ譲歩しながら反論する自然な言い回し。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c83",
    en: "I'm feeling a bit under the weather, so I'll take a rain check.",
    ja: "ちょっと体調がすぐれないから、また今度にさせてもらうね。",
    notes: [
      "under the weather = 体調が悪い。",
      "take a rain check = (誘いを)また今度にする、延期する。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c84",
    en: "Had I known you were coming, I would have baked a cake.",
    ja: "あなたが来るって知っていたら、ケーキを焼いておいたのに。",
    notes: [
      "Had I known = If I had known の倒置による仮定法過去完了。",
      "過去の事実に反する後悔や残念な気持ちを表す。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c85",
    en: "Now that I think about it, I should have stayed in touch with her.",
    ja: "今になって思えば、彼女とは連絡を取り続けておくべきだった。",
    notes: [
      "now that I think about it = 今考えてみると。",
      "should have stayed = ~しておくべきだった(過去への後悔)。",
      "stay in touch = 連絡を取り合う。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c86",
    en: "Cheer up; things have a way of working out in the end.",
    ja: "元気出して、物事は最後にはなんとかなるものだよ。",
    notes: [
      "cheer up = 元気を出す。",
      "have a way of doing = ~するものだ、~しがちだ。",
      "work out = うまくいく、解決する。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c87",
    en: "To be honest, I'm not really into hiking; it's not my cup of tea.",
    ja: "正直に言うと、ハイキングはあまり好きじゃないんだ、性に合わなくて。",
    notes: [
      "be into something = ~に夢中だ、~が好きだ。",
      "not my cup of tea = 好みではない、性に合わない。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c88",
    en: "Knowing him, he'll probably show up an hour late as usual.",
    ja: "彼のことだから、いつものように1時間は遅れて来るだろうね。",
    notes: [
      "Knowing him = 彼のことだから(分詞構文)。",
      "show up = 現れる、姿を見せる。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c89",
    en: "Let's agree to disagree; we're clearly not going to see eye to eye.",
    ja: "意見が違うってことで折り合いをつけよう、明らかに考えは一致しないから。",
    notes: [
      "agree to disagree = 意見の相違を認める、折り合いをつける。",
      "see eye to eye = 意見が一致する。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c90",
    en: "Generally speaking, I'd rather stay in than go out on a Friday night.",
    ja: "概して言えば、金曜の夜は出かけるより家にいる方がいいな。",
    notes: [
      "generally speaking = 概して言えば(独立分詞構文)。",
      "would rather A than B = BよりむしろAしたい。",
      "stay in = 家にいる、外出しない。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c91",
    en: "She's been on cloud nine ever since she got the good news.",
    ja: "彼女はいい知らせを聞いてからずっと有頂天になっているよ。",
    notes: [
      "on cloud nine = 有頂天で、とても幸せで。",
      "ever since = ~して以来ずっと。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c92",
    en: "Oh great, another rainy weekend, just what I was hoping for.",
    ja: "ああ最高だね、また雨の週末か、まさに待ち望んでいた通りだよ。",
    notes: [
      "just what I was hoping for = まさに望んでいたこと(ここでは皮肉)。",
      "皮肉(sarcasm)で実際は不満を表す典型的な言い回し。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c93",
    en: "If I were you, I'd sleep on it before making such a big decision.",
    ja: "私があなたなら、そんな大きな決断をする前に一晩じっくり考えるな。",
    notes: [
      "if I were you = 私があなたなら(仮定法過去)。",
      "sleep on it = 一晩寝かせて考える、即決を避ける。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c94",
    en: "Let's not jump to conclusions until we've heard both sides of the story.",
    ja: "両方の言い分を聞くまでは、早合点しないでおこう。",
    notes: [
      "jump to conclusions = 早合点する、結論を急ぐ。",
      "both sides of the story = 双方の言い分。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c95",
    en: "I can't put my finger on it, but something about him feels off.",
    ja: "うまく言えないんだけど、彼にはどこか違和感があるんだよね。",
    notes: [
      "put one's finger on it = (問題などを)正確に指摘する、はっきり言い当てる。",
      "feel off = 何かおかしい感じがする。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c96",
    en: "Come to think of it, we haven't caught up in ages.",
    ja: "そういえば、ずいぶん長いこと近況を話していないね。",
    notes: [
      "come to think of it = そういえば、考えてみれば。",
      "catch up = 近況を報告し合う。",
      "in ages = 長い間。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c97",
    en: "He tends to bottle up his feelings instead of talking things through.",
    ja: "彼は物事を話し合うのではなく、感情をため込みがちなんだ。",
    notes: [
      "bottle up one's feelings = 感情を抑え込む、ため込む。",
      "talk something through = ~をとことん話し合う。",
    ],
    words: [
      { word: "tend to", meaning: "~しがちである" },
    ],
    source: "conversation",
  },
  {
    id: "c98",
    en: "Take your time; there's no rush to figure everything out today.",
    ja: "焦らなくていいよ、今日中に全部を解決する必要はないんだから。",
    notes: [
      "take your time = ゆっくりでいい、焦らないで。",
      "figure out = 解明する、理解する。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c99",
    en: "Looking back, dropping out of that class was a blessing in disguise.",
    ja: "振り返ってみれば、あの授業をやめたのは結果的に良かったんだ。",
    notes: [
      "looking back = 振り返ってみれば(分詞構文)。",
      "drop out of = ~をやめる、中退する。",
      "a blessing in disguise = 一見不運だが結果的に幸運なこと。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c100",
    en: "I'm torn between staying home and tagging along with you guys.",
    ja: "家にいるか、君たちについて行くか、決めかねているんだよね。",
    notes: [
      "be torn between A and B = AとBの間で板挟みになる、決めかねる。",
      "tag along = (誰かに)ついて行く。",
    ],
    words: [
      { word: "torn", meaning: "板挟みの(tearの過去分詞)" },
    ],
    source: "conversation",
  },
  {
    id: "c101",
    en: "Whatever you decide, just know that I've got your back.",
    ja: "何を決めるにしても、私が味方だってことだけは忘れないでね。",
    notes: [
      "whatever you decide = 何を決めるにしても(譲歩)。",
      "have got someone's back = ~を支える、味方である。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c102",
    en: "Let's play it by ear and see how we feel when the weekend comes.",
    ja: "成り行きに任せて、週末になってからどうするか決めようよ。",
    notes: [
      "play it by ear = その場の状況に応じて決める、成り行きに任せる。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c103",
    en: "Granted, it was my fault, but you didn't have to rub it in.",
    ja: "確かに私のせいだったけど、わざわざ嫌味を言うことはないでしょ。",
    notes: [
      "granted = 確かに~だが(譲歩を表す副詞)。",
      "rub it in = (失敗などを)しつこく蒸し返す、嫌味を言う。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c104",
    en: "Frankly, I think you're blowing this whole thing out of proportion.",
    ja: "率直に言って、君はこの件を大げさに考えすぎだと思うよ。",
    notes: [
      "frankly = 率直に言って。",
      "blow something out of proportion = ~を大げさに騒ぎ立てる。",
    ],
    words: [
      { word: "proportion", meaning: "釣り合い、割合" },
    ],
    source: "conversation",
  },
  {
    id: "c105",
    en: "My grandma always says laughter is the best medicine.",
    ja: "うちのおばあちゃんはいつも、笑いは最高の薬だって言うんだ。",
    notes: [
      "laughter is the best medicine = 笑いは最良の薬(ことわざ)。",
    ],
    words: [
      { word: "laughter", meaning: "笑い" },
    ],
    source: "conversation",
  },
  {
    id: "c106",
    en: "I'd love to come, but I'm swamped with work and can't make it.",
    ja: "行きたいのは山々だけど、仕事に追われていて顔を出せないんだ。",
    notes: [
      "I'd love to, but ... = 行きたいけど(丁寧に断る前置き)。",
      "be swamped with = ~に忙殺される、追われる。",
      "make it = 都合をつけて行く、間に合う。",
    ],
    words: [
      { word: "swamped", meaning: "忙殺されて(swampは押し寄せる)" },
    ],
    source: "conversation",
  },
  {
    id: "c107",
    en: "Hang in there; the worst of it will be over before you know it.",
    ja: "頑張って、つらい時期は気づかないうちに終わるものだから。",
    notes: [
      "hang in there = 頑張って、踏ん張って。",
      "before you know it = あっという間に、気づかないうちに。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c108",
    en: "All things considered, moving to the countryside was the right call.",
    ja: "あらゆることを考え合わせると、田舎に引っ越したのは正しい判断だったよ。",
    notes: [
      "all things considered = すべてを考慮すると(独立分詞構文)。",
      "the right call = 正しい判断、適切な決定。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c109",
    en: "Let bygones be bygones; there's no point dwelling on the past.",
    ja: "済んだことは水に流そう、過去をくよくよ考えても仕方ないよ。",
    notes: [
      "let bygones be bygones = 過去のことは水に流す。",
      "dwell on = ~をくよくよ考える、思い悩む。",
    ],
    words: [
      { word: "bygones", meaning: "過ぎ去ったこと" },
    ],
    source: "conversation",
  },
  {
    id: "c110",
    en: "He bit off more than he could chew by taking on three projects at once.",
    ja: "彼は一度に3つの企画を抱え込んで、手に余ることをやってしまったんだ。",
    notes: [
      "bite off more than one can chew = 手に余ることに手を出す、無理をする。",
      "take on = (仕事などを)引き受ける。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c111",
    en: "Fair enough, but let's at least give my idea a shot first.",
    ja: "それも一理あるけど、まずは私の案を試してみようよ。",
    notes: [
      "fair enough = それも一理ある、まあいいだろう(譲歩)。",
      "give something a shot = ~を試してみる。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c112",
    en: "She kept her chin up even when everything seemed to fall apart.",
    ja: "何もかも崩れていくように見えても、彼女は気丈に振る舞っていた。",
    notes: [
      "keep one's chin up = 気を強く持つ、めげない。",
      "fall apart = ばらばらになる、崩壊する。",
    ],
    words: [
      { word: "chin", meaning: "あご" },
    ],
    source: "conversation",
  },
  {
    id: "c113",
    en: "I can't help but wonder whether we made the right choice.",
    ja: "私たちは正しい選択をしたのかと、どうしても考えずにはいられない。",
    notes: [
      "can't help but do = ~せずにはいられない。",
      "wonder whether = ~かどうかと思う。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c114",
    en: "Mark my words, that hobby of his will turn into a career someday.",
    ja: "言っておくけど、彼のあの趣味はいつか仕事になるよ。",
    notes: [
      "mark my words = 言っておくが、覚えておいて(予言的に念を押す)。",
      "turn into = ~に変わる、~になる。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c115",
    en: "Weather permitting, we're planning to head out for a picnic tomorrow.",
    ja: "天気が許せば、明日ピクニックに出かけるつもりなんだ。",
    notes: [
      "weather permitting = 天気が良ければ(独立分詞構文)。",
      "head out = 出かける、出発する。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c116",
    en: "Don't sweat the small stuff; focus on what really matters to you.",
    ja: "細かいことで悩まないで、本当に大切なことに集中しなよ。",
    notes: [
      "don't sweat the small stuff = 些細なことで思い悩むな。",
      "what really matters = 本当に重要なこと。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c117",
    en: "We see things differently, but at the end of the day, family is family.",
    ja: "考え方は違っても、結局のところ家族は家族だからね。",
    notes: [
      "see things differently = 物事の見方が違う。",
      "at the end of the day = 結局のところ、要するに。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c118",
    en: "You've really come a long way since you first picked up the guitar.",
    ja: "ギターを始めた頃に比べて、君は本当に成長したね。",
    notes: [
      "come a long way = 大きく進歩する、成長する。",
      "pick up = (技能・趣味などを)始める、習得する。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c119",
    en: "If push comes to shove, we can always crash at my brother's place.",
    ja: "いざとなったら、兄の家に泊めてもらえばいいんだから。",
    notes: [
      "if push comes to shove = いざとなれば、最悪の場合は。",
      "crash at someone's place = (誰かの家に)泊まる、寝泊まりする。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c120",
    en: "Speaking of which, whatever happened to that book you lent me?",
    ja: "そういえば、私に貸してくれたあの本はどうなったんだっけ。",
    notes: [
      "speaking of which = そういえば、その話で思い出したけど。",
      "whatever happened to ...? = ~はどうなったのか(消息を尋ねる)。",
      "lent = lend(貸す)の過去形。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "s16",
    en: "Be the change that you wish to see in the world.",
    ja: "世界に見たいと願う変化に、あなた自身がなりなさい。",
    notes: [
      "「Be the change」は命令文で、補語に名詞句changeを取る第2文型。",
      "that you wish to see in the world はchangeを修飾する関係詞節。",
    ],
    words: [
      { word: "wish", meaning: "願う" },
    ],
    source: "speech",
    attribution: "attributed to Mahatma Gandhi",
  },
  {
    id: "s17",
    en: "Imagination is more important than knowledge.",
    ja: "想像力は知識よりも重要である。",
    notes: [
      "比較級more important than ... で「~よりも重要」を表す。",
      "imagination = 想像力。",
      "knowledge = 知識。",
    ],
    words: [
      { word: "imagination", meaning: "想像力" },
      { word: "knowledge", meaning: "知識" },
    ],
    source: "speech",
    attribution: "Albert Einstein",
  },
  {
    id: "s18",
    en: "People will forget what you said, but they will never forget how you made them feel.",
    ja: "人はあなたが言ったことは忘れるが、あなたが与えた気持ちは決して忘れない。",
    notes: [
      "but を挟んだ対句構造で「忘れる」と「決して忘れない」を対比している。",
      "how you made them feel は「どう感じさせたか」を表す名詞節。make + 目的語 + 原形で使役。",
    ],
    words: [
      { word: "forget", meaning: "忘れる" },
    ],
    source: "speech",
    attribution: "Maya Angelou",
  },
  {
    id: "s19",
    en: "Believe you can and you're halfway there.",
    ja: "できると信じれば、もう半分は達成したも同然だ。",
    notes: [
      "命令文 + and で「~しなさい、そうすれば…」を表す。",
      "halfway there = そこ(目標)への道のりの半分。",
    ],
    words: [
      { word: "halfway", meaning: "中間で、半分まで" },
    ],
    source: "speech",
    attribution: "Theodore Roosevelt",
  },
  {
    id: "s20",
    en: "The only thing worse than being blind is having sight but no vision.",
    ja: "目が見えないことよりも悪い唯一のことは、視力はあっても展望がないことだ。",
    notes: [
      "worse than ... が後ろからthe only thingを修飾する形容詞句。",
      "sight(視力)とvision(展望)の語呂を生かした対比表現。",
    ],
    words: [
      { word: "blind", meaning: "目が見えない" },
      { word: "sight", meaning: "視力" },
      { word: "vision", meaning: "展望、先見の明" },
    ],
    source: "speech",
    attribution: "Helen Keller",
  },
  {
    id: "s21",
    en: "The way to get started is to quit talking and begin doing.",
    ja: "始めるための方法は、話すのをやめて行動を始めることだ。",
    notes: [
      "The way to get started という主語に、be動詞でto不定詞句が補語として続く構造。",
      "quit talking(話すのをやめる)とbegin doing(行動を始める)の対比。quit + 動名詞。",
    ],
    words: [
      { word: "quit", meaning: "やめる" },
    ],
    source: "speech",
    attribution: "attributed to Walt Disney",
  },
  {
    id: "s22",
    en: "It does not matter how slowly you go as long as you do not stop.",
    ja: "立ち止まりさえしなければ、どれほどゆっくり進んでも問題ではない。",
    notes: [
      "It does not matter how ... は形式主語itを使い「~かは問題ではない」を表す。",
      "as long as = ~しさえすれば、~する限り。",
    ],
    words: [
      { word: "matter", meaning: "重要である、問題になる" },
    ],
    source: "speech",
    attribution: "attributed to Confucius",
  },
  {
    id: "s23",
    en: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    ja: "私たちは繰り返し行うことそのものである。だから卓越とは行為ではなく習慣なのだ。",
    notes: [
      "We are what we repeatedly do は関係詞whatを補語にした第2文型。",
      "not A but B の構文で「Aではなく B」を表す。",
    ],
    words: [
      { word: "excellence", meaning: "卓越、優秀さ" },
      { word: "habit", meaning: "習慣" },
    ],
    source: "speech",
    attribution: "attributed to Aristotle (paraphrased by Will Durant)",
  },
  {
    id: "s24",
    en: "Whether you think you can, or you think you can't, you're right.",
    ja: "できると思おうと、できないと思おうと、あなたの思った通りになる。",
    notes: [
      "Whether A or B で「AであろうとBであろうと」を表す譲歩構文。",
      "you can と you can't を対にした対句表現で、自己暗示の力を説いている。",
    ],
    words: [],
    source: "speech",
    attribution: "attributed to Henry Ford",
  },
  {
    id: "s25",
    en: "There is no greater agony than bearing an untold story inside you.",
    ja: "語られない物語を内に抱えることほど大きな苦しみはない。",
    notes: [
      "There is no greater ... than ~ で「~ほど大きい…はない」という最上級的な比較表現。",
      "bearing an untold story は動名詞句で「語られない物語を抱えること」を表す。",
    ],
    words: [
      { word: "agony", meaning: "苦悩、苦しみ" },
      { word: "bearing", meaning: "抱えること、耐えること" },
      { word: "untold", meaning: "語られない" },
    ],
    source: "speech",
    attribution: "Maya Angelou",
  },
  {
    id: "s26",
    en: "One child, one teacher, one book, one pen can change the world.",
    ja: "一人の子ども、一人の教師、一冊の本、一本のペンが世界を変えられる。",
    notes: [
      "one ... を四回畳みかける反復(アナフォラ)で、小さな存在の力を強調している。",
      "主語の列挙のあとにcan change the worldと続け、教育の力を訴えている。",
    ],
    words: [],
    source: "speech",
    attribution: "Malala Yousafzai, UN Speech (2013)",
  },
  {
    id: "s27",
    en: "Whatever you are, be a good one.",
    ja: "何者であろうと、立派なものでありなさい。",
    notes: [
      "Whatever you are は「あなたが何者であろうと」を表す譲歩の名詞節。",
      "be a good one は命令文で、oneは前のyou areの補語を受ける代名詞。",
    ],
    words: [],
    source: "speech",
    attribution: "attributed to Abraham Lincoln",
  },
  {
    id: "s28",
    en: "Winning isn't everything, but wanting to win is.",
    ja: "勝つことがすべてではないが、勝ちたいと願うことはすべてだ。",
    notes: [
      "but で前後を対比し、文末のisのあとにeverythingが省略されている。",
      "Winning(勝つこと)とwanting to win(勝ちたいと願うこと)を対句で並べている。",
    ],
    words: [],
    source: "speech",
    attribution: "Vince Lombardi",
  },
  {
    id: "s29",
    en: "The biggest adventure you can take is to live the life of your dreams.",
    ja: "あなたができる最大の冒険は、夢に描いた人生を生きることだ。",
    notes: [
      "The biggest adventure (that) you can take と関係詞が省略された関係詞節が主語を修飾。",
      "補語にto不定詞句to live ... を取り「~することだ」と説明する構造。",
    ],
    words: [
      { word: "adventure", meaning: "冒険" },
    ],
    source: "speech",
    attribution: "Oprah Winfrey",
  },
  {
    id: "s30",
    en: "When they go low, we go high.",
    ja: "相手が品位を下げても、私たちは品位を保つ。",
    notes: [
      "go low と go high を対にした対句で、低俗さに同調しない姿勢を表す。",
      "go low = 卑劣な手に出る。",
      "go high = 高潔さを保つ。",
    ],
    words: [],
    source: "speech",
    attribution: "Michelle Obama, DNC Speech (2016)",
  },
  {
    id: "c121",
    en: "Is this keyboard just for display, or can I actually buy it right here?",
    ja: "このキーボードって展示品なの?それともここで買えちゃう感じ?",
    notes: [
      "for display = 展示用の、見本の。",
      "right here = まさにこの場で。",
    ],
    words: [
      { word: "display", meaning: "展示、陳列" },
    ],
    source: "conversation",
  },
  {
    id: "c122",
    en: "Any chance you could knock another twenty bucks off the price?",
    ja: "もう20ドルくらい安くしてもらえたりしない?",
    notes: [
      "Any chance you could ...? = ~してもらえたりする?(くだけた依頼)。",
      "knock ... off the price = 値段を~分まけてくれる。bucks = ドル(口語)。",
    ],
    words: [
      { word: "bucks", meaning: "ドル(buckの複数、口語)" },
    ],
    source: "conversation",
  },
  {
    id: "c123",
    en: "This keyboard feels so creamy to type on, I'm totally obsessed.",
    ja: "このキーボード、打鍵感がめちゃくちゃクリーミーで最高、もう完全にハマってる。",
    notes: [
      "creamy = (打鍵感が)滑らかでなめらかな(キーボード好きの定番表現)。",
      "be obsessed = ハマっている、夢中になっている。",
    ],
    words: [
      { word: "creamy", meaning: "なめらかな、クリーミーな" },
      { word: "obsessed", meaning: "夢中になった、取りつかれた" },
    ],
    source: "conversation",
  },
  {
    id: "c124",
    en: "Forty-nine keys are more than enough for me.",
    ja: "49個もキーがあれば十分すぎるくらいだよ。",
    notes: [
      "more than enough = 十分すぎる、有り余るほど。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c125",
    en: "The shop assistant is a woman wearing haori jacket.",
    ja: "店員さんは、羽織を着てる女性だよ。",
    notes: [
      "over there = あそこの、向こうにいる。",
      "wearing ... が後ろからwomanを修飾する分詞句。haori = 羽織(着物の上着)。",
    ],
    words: [
      { word: "shop assistant", meaning: "店員" },
    ],
    source: "conversation",
  },
  {
    id: "c126",
    en: "Technically you're not supposed to wear a haori with a yukata; it goes with kimono like tsumugi instead.",
    ja: "厳密には浴衣に羽織は合わせないことになってて、羽織を着るなら紬とかの着物に合わせるんだよ。",
    notes: [
      "be supposed to = ~することになっている(ルールや決まり)。",
      "go with = ~に合う、調和する。",
    ],
    words: [
      { word: "technically", meaning: "厳密に言えば" },
    ],
    source: "conversation",
  },
  {
    id: "c127",
    en: "Rules aside, if you're just wearing it for fun, I say style it however you like.",
    ja: "ルールはともかく、普段のおしゃれで着るだけなら、好きなように着こなしちゃえばいいと思うな。",
    notes: [
      "... aside = ~はさておき、~はともかく。",
      "however you like = 好きなように。I say ... = ~だと思うよ(くだけた意見の切り出し)。",
    ],
    words: [
      { word: "style", meaning: "着こなす、コーディネートする(style)" },
    ],
    source: "conversation",
  },
  {
    id: "c128",
    en: "It's been so hot lately, so it's totally fine to switch up your outfit to match the temperature.",
    ja: "最近すごく暑いから、気温に合わせて衣替えしちゃって全然オッケーだよ。",
    notes: [
      "switch up = 変える、切り替える(口語)。",
      "to match ... = ~に合わせて。totally fine = 全然問題ない。",
    ],
    words: [
      { word: "outfit", meaning: "服装、コーディネート" },
    ],
    source: "conversation",
  },
  {
    id: "c129",
    en: "Kimono come in awase, hitoe, and usumono, and you switch them out depending on the temperature.",
    ja: "着物には袷、単衣、薄物があって、気温ごとに衣替えして着分けるんだよ。",
    notes: [
      "come in ... = (種類が)~に分かれている、~がある。",
      "switch out = 取り替える。depending on = ~に応じて。",
    ],
    words: [],
    source: "conversation",
  },
  {
    id: "c130",
    en: "So what kind of patterns or colors are you into?",
    ja: "それで、どんな柄とか色が好みなの?",
    notes: [
      "what kind of ...? = どんな種類の~?",
      "be into = ~が好き、~に興味がある(口語)。",
    ],
    words: [
      { word: "patterns", meaning: "柄、模様(pattern)" },
    ],
    source: "conversation",
  },
  {
    id: "c131",
    en: "Honestly, it's pretty rare to see people wearing kimono in daily life here now. But because of that, we have this amazing treasure trove of vintage kimonos. I'm just so in love with them, and I really want to share that with everyone around the world. I hope you find something here that speaks to you!",
    ja: "正直、今ここ(日本)で毎日着物を着ている人を見かけるのは珍しいことなんです。でもそのおかげで、こうして素晴らしいヴィンテージの着物たちがたくさん手に入るんですよ。私は着物が大好きで、この魅力を世界中の皆さんと分かち合いたいんです。ここでお気に入りの一枚が見つかるといいですね!",
    notes: [
      "treasure trove = (掘り出し物の)宝庫、宝の山。",
      "be in love with = ~が大好きである、~に夢中である。",
      "something that speaks to you = (人の)心に響くもの、ぐっとくるもの。speak to = 心に訴えかける。",
    ],
    words: [
      { word: "treasure trove", meaning: "宝庫、宝の山" },
      { word: "vintage", meaning: "年代物の、ヴィンテージの" },
    ],
    source: "conversation",
  },
  {
    id: "c132",
    en: "It's a shame they're not worn as often anymore, but I think they deserve to be seen and loved all over the world.",
    ja: "もう普段着られることが少なくなったのは残念ですが、世界中で見られて、愛されるべきものだと思うんです。",
    notes: [
      "It's a shame (that) ... = ~なのは残念だ。",
      "not ... anymore = もはや~ない。as often = 以前ほど頻繁には。",
      "deserve to be ... = ~されるに値する、~されるべきだ。",
    ],
    words: [
      { word: "shame", meaning: "残念なこと" },
      { word: "deserve", meaning: "~に値する、~されるべきである" },
    ],
    source: "conversation",
  },
];
