import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  Link,
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from "react-scroll";
import "./App.css";
import Button from "./Button";
import Tab from "./Tab";
import Article from "./Article";
import Job from "./Job";
import Qrcode from "./assets/qrcode.png";
import Menu from "./assets/menu.png";
import Top from "./assets/top.png";
import Close from "./assets/close.png";
import Job1 from "./assets/job1.png";
import Job2 from "./assets/job2.png";
import Job3 from "./assets/job3.png";
import Job4 from "./assets/job4.png";
import Gan01 from "./assets/干货01.jpeg";
import Gan02 from "./assets/干货02.jpeg";
import Gan03 from "./assets/干货03.jpeg";
import Gan04 from "./assets/干货04.jpeg";
import Dui01 from "./assets/对话01.jpeg";
import Dui02 from "./assets/对话02.jpeg";
import You01 from "./assets/有趣01.jpeg";

class App extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.openmenu = this.openmenu.bind(this);
    this.switchPage = this.switchPage.bind(this);
    this.switchTab = this.switchTab.bind(this);
    this.toArticles = this.toArticles.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.typingEffect = this.typingEffect.bind(this);
    this.typingEffect = this.typingEffect.bind(this);
    this.deletingEffect = this.deletingEffect.bind(this);
    this.selectJob = this.selectJob.bind(this);
    this.hideDetail = this.hideDetail.bind(this);

    this.refs = React.createRef();

    this.state = {
      menuopen: false,
      qr: false,
      focus: "home",
      tab: "干货",
      showTop: false,
      forfun: false,
      words: ["留学。", "数据。", "分享。"],
      content: "",
      i: 0,
      timer: "",
      selectedJob: "自然语言处理工程师",
      showJobDetail: false,
      classes: {
        home: "focus ",
        about: "",
        join: "",
        contact: "",
        article: ""
      },
      pages: [
        { label: "home", name: "首页" },
        { label: "article", name: "往期文章" },
        { label: "about", name: "关于必览" },
        { label: "join", name: "加入我们" },
        { label: "contact", name: "联系我们" }
      ],
      jobs: [
        {
          title: "自然语言处理工程师",
          src: Job1,
          desc: [
            "参与智能推荐引擎的核心算法研发，包括但不限于",
            "1.负责对话系统的意图理解",
            "2.槽位解析等核心算法研发",
            "3.负责对话系统中多轮查询理解和对话状态跟踪等核心算法研发",
            "4.负责对话系统中对话管理、排序、引导等核心算法研发"
          ],
          req: [
            "1.熟悉机器学习基础理论和常用算法，有2年以上相关项目经验、有深度学习经验者优先",
            "2.熟悉自然语言处理基础理论和常用算法，有文本分类、序列标注等经典任务相关项目经验者优先",
            "3.熟练使用C/C++/Python等至少一门语言，熟练使用数据结构和常用算法，有较强的算法设计和实现能力",
            "4.较强的技术攻关能力，能够跟进领域内最新技术研究成果，并结合应用场景快速实验和调优",
            "5.优秀的分析问题和解决问题的能力，对解决具有挑战性的问题充满激情",
            "6.有强烈的上进心和求知欲，产品问题驱动导向",
            "7.具备良好的沟通能力与团队合作精神"
          ]
        },
        {
          title: "数据分析专家",
          src: Job2,
          desc: [
            "1.根据团队业务逻辑，建立相应的数据分析支持体系，对必览的产品、内容、用户、渠道、运营活动及时跟踪，并能独立产出项目分析报告",
            "2.基于用户增长和渠道推广，建立渠道质量质量评估体系，提升渠道推广ROI",
            "3.依据用户生命周期模型，构建用户成长分析体系，实现用户行为价值分层， 并对不同层级的用户进行价值和活跃度评估，提升用户粘性和价值，提升阅读、充值转化，降低用户流失率",
            "4.建立运营活动效果评估模型，提升运营活动效果",
            "5.对产品运营过程中的各项数据进行统计和分析，为产品和运营策略制定提供有效的数据支持，并根据数据提出有效的应对策略和产品优化分析",
            "6.负责对运营产品进行监测、追踪，并进行深度诊断性深度分析、挖掘，并通过分析潜在业务机会给出建议"
          ],
          req: [
            "1.统计学、数学、财务、计算机等相关专业背景，3年以上数据分析/挖掘相关工作经验",
            "2.对数据敏感，具备较强的数据统计分析能力，较强的总结分析和写作能力",
            "3.熟练操作Office软件，熟悉掌握SQL、R、Python、SPSS等分析工具",
            "4.思路清晰，具备良好的沟通能力和理解能力，较强的学习能力以及快速解决问题的能力",
            "5.互联网行业背景优先，有用户增长、流量运营、产品运营、渠道质量分析背景优先"
          ]
        },
        {
          title: "算法高级工程师",
          src: Job3,
          desc: [
            "1.负责用户画像，智能推荐算法和机器学习平台的搭建",
            "2.改进产品内容推荐系统，优化用户阅读体验"
          ],
          req: [
            "1.三年以上互联网工作经验，在内容信息流推荐方面有实践经验",
            "2.对推荐系统常见算法和相关业务有深刻了解，在以下场景和领域有丰富经验：机器学习平台（包括参数服务器、分布式训练框架等），推荐场景（召回策略、用户和文章的冷启动策略、用户和文章特征工程、内容生态",
            "3.熟悉常用数据结构，具备扎实的算法基本功，熟悉C++、Python、go等编程语言",
            "4.具备良好的业务理解能力和逻辑思维能力，能够从海量数据中发现关键特征，具备出色的问题分析及解决能力",
            "5.有强烈的上进心和求知欲，产品问题驱动导向",
            "6.具备良好的沟通能力与团队合作精神"
          ]
        },
        {
          title: "“共建未来”实习生",
          src: Job4,
          desc: [
            "必览“共建未来”实习生计划是为本科、硕士、博士在读学生量身打造的实习计划，旨在提供给同学了解必览和加入必览（中国及全球）的最佳机会和平台。我们提供富有竞争力的薪水，并对优秀实习生给予期权激励。实习职位涵盖软件开发、产品运营、市场推广、新媒体内容运营等领域。实习期通常需要达二个月或以上，形式分全职兼职两种，全职实习生周一至周五工作5天，兼职实习生无具体时间要求。"
          ],
          req: [
            "本科及以上学历，有海外留学或交换经验者优先。具有强烈的自我驱动力与良好团队合作精神。理解力强、能够保持良好沟通、主动积极、有耐心且配合度高。"
          ]
        }
      ],
      ganArticles: [
        {
          heading: "留学必备干货丨英美澳住房指南",
          src: Gan01,
          link: "https://mp.weixin.qq.com/s/LsOZ3keTNUHAKi5RsRzGxg"
        },
        {
          heading: "留学必备干货丨去英国一定要下载的41个app",
          src: Gan02,
          link: "https://mp.weixin.qq.com/s/E3NgnHYEjFBMgbw9GQA0xA"
        },
        {
          heading: "留学必备干货丨英美澳签证指南",
          src: Gan03,
          link: "https://mp.weixin.qq.com/s/TuPqSbWn2Ktb7dI_n9MmTw"
        },
        {
          heading: "留学必备干货丨机票预订指南",
          src: Gan04,
          link: "https://mp.weixin.qq.com/s/OxrXDqoVbYl2Yibhmm9uvg"
        }
      ],
      duiArticles: [
        {
          heading: "对话梁露：如何高效求职进入英国互联网公司？",
          src: Dui01,
          link: "https://mp.weixin.qq.com/s/ScTBFg-7hGkIuDPsU3LeaQ"
        },
        {
          heading: "对话李北辰：从清华到MIT直博的申请之路",
          src: Dui02,
          link: "https://mp.weixin.qq.com/s/8DoN3tcy46sVz2iAAUBYwA"
        }
      ],
      youArticles: [
        {
          heading: "英国最好吃的菜就是外国菜",
          src: You01,
          link: "https://mp.weixin.qq.com/s/79_chl9HorDFQDF4OJdPBQ"
        }
      ]
    };
  }

  componentDidUpdate() {
    var elem = ReactDOM.findDOMNode(this.refs.container);
    if (elem.scrollTop > 100 && this.state.showTop == false) {
      this.setState({
        showTop: true
      });
    } else if (elem.scrollTop < 100 && this.state.showTop) {
      this.setState({
        showTop: false
      });
    }
  }

  handleScroll() {
    this.setState({
      forfun: !this.state.forfun
    });
  }

  onClick() {
    this.setState({
      qr: true
    });
    window.clicked = true;
  }

  openmenu() {
    this.setState({
      menuopen: !this.state.menuopen
    });
  }

  switchTab(clicked) {
    if (clicked !== this.state.tab) {
      this.setState({
        tab: clicked
      });
    }
  }

  switchPage(clicked) {
    if (clicked !== this.state.focus) {
      let copy = Object.assign({}, this.state.classes);
      copy[this.state.focus] = "unfocus ";
      copy[clicked] = "focus ";
      this.setState({
        focus: clicked,
        classes: copy
      });
      if (clicked === "home") {
        window.showqr();
      } else {
        window.hideqr();
      }
    }
    this.openmenu();
  }

  selectJob(selected) {
    this.setState({
      selectedJob: selected,
      showJobDetail: true
    });
  }

  hideDetail() {
    this.setState({
      showJobDetail: false
    });
  }

  toArticles() {
    let copy = Object.assign({}, this.state.classes);
    copy[this.state.focus] = "unfocus ";
    copy.article = "focus ";
    this.setState({
      focus: "article",
      classes: copy
    });
    window.hideqr();
  }

  typingEffect() {
    let word = this.state.words[this.state.i].split("");
    const that = this;
    const loopTyping = function() {
      if (word.length > 0) {
        that.setState({
          content: that.state.content + word.shift()
        });
      } else {
        clearTimeout(that.state.timer);
        that.deletingEffect();
        return false;
      }
      that.setState({
        timer: setTimeout(loopTyping, 600)
      });
    };
    loopTyping();
  }

  deletingEffect() {
    let word = this.state.words[this.state.i].split("");
    const that = this;
    const loopDeleting = function() {
      if (word.length > 0) {
        word.pop();
        that.setState({
          content: word.join("")
        });
      } else {
        if (that.state.words.length > that.state.i + 1) {
          that.setState({
            i: that.state.i + 1
          });
        } else {
          that.setState({
            i: 0
          });
        }
        clearTimeout(that.state.timer);
        that.typingEffect();
        return false;
      }
      that.setState({
        timer: setTimeout(loopDeleting, 200)
      });
    };
    loopDeleting();
  }

  componentDidMount() {
    this.typingEffect();
  }

  render() {
    const list_class = this.state.menuopen ? "show" : "hide";
    const menu_ani = this.state.menuopen ? "menu rotate" : "menu roback";
    const qrcode = this.state.qr ? "appear" : "";

    const cates = ["干货", "对话", "有趣"];
    const tabs = cates.map((label, i) => {
      return (
        <Tab
          label={label}
          key={i}
          chosen={this.state.tab}
          onClick={this.switchTab}
        />
      );
    });

    const buttons = this.state.pages.map((page, i) => {
      return (
        <Button
          key={i}
          label={page.label}
          name={page.name}
          onClick={this.switchPage}
        />
      );
    });

    let array = [];

    if (this.state.tab === "干货") {
      array = this.state.ganArticles.slice();
    } else if (this.state.tab === "对话") {
      array = this.state.duiArticles.slice();
    } else {
      array = this.state.youArticles.slice();
    }

    const articles = array.map((article, i) => {
      return (
        <Article
          src={article.src}
          key={i}
          heading={article.heading}
          link={article.link}
        />
      );
    });

    const jobs = this.state.jobs.map((job, i) => {
      return (
        <Job key={i} src={job.src} name={job.title} onClick={this.selectJob} />
      );
    });

    const job = this.state.jobs.find(j => j.title == this.state.selectedJob);

    const descs = job.desc.map((d, i) => {
      return (
        <div className="job-detail" key={i}>
          {d}
        </div>
      );
    });

    const reqs = job.req.map((r, i) => {
      return (
        <div className="job-detail" key={i}>
          {r}
        </div>
      );
    });

    let detailPageClass = "job-detail-page";
    let shadowClass = "shadow";

    if (this.state.showJobDetail) {
      detailPageClass += " job-show";
      shadowClass += " job-show";
    }

    let top = "top ";
    if (this.state.showTop) {
      top += "show";
    }

    return (
      <div className="App">
        <div className={this.state.classes.home + "page page1"}>
          <div className="h-container">
            <div>
              <span className="chi text">必览</span>
              <span className="eng text">Worth Note</span>
            </div>
            <div className="subtitle text">
              基于数据挖掘技术的个性化留学推荐引擎
            </div>
            <div className="buttons">
              <span className="button" id="article" onClick={this.toArticles}>
                往期文章
              </span>
              <span className="button" onClick={this.onClick}>
                了解更多
              </span>
            </div>
          </div>
          <img id="qr" className={qrcode} src={Qrcode} />
        </div>
        <div className={this.state.classes.about + "page"}>
          <div className="about-container">
            <div className="about-left chi text">关于必览</div>
            <div className="about-content">
              <div className="typing">
                {this.state.content}
                <span className="blink">|</span>
              </div>
              <div className="about-sub">必览出品，必值观览。</div>
              <div className="about-sub">
                致力于通过技术连接高品质内容和对世界感兴趣的人，与百万留学生分享经验与见解，让理想的海外留学清晰可见。
              </div>
            </div>
          </div>
        </div>
        <div className={this.state.classes.join + "page"}>
          <div className="container">
            <div className="text chi join">
              加入我们，一起尝试影响这个世界，为所想要的理想生活投票
            </div>
            <div className="j-sub">
              <p>我们正在寻找富有才华、积极进取的伙伴们，</p>
              <p>
                如果你有做市场、研发、运营、产品、新媒体的任一方面潜力并对创新创业充满激情和热爱，
              </p>
              <p>欢迎加入必览大家庭，开始智慧的职业生涯，</p>
              <p>与优秀的公司一起蜕变成长、帮助百万留学生共建未来！</p>
            </div>
            <div className="jobs">{jobs}</div>
            <div className="j-email">
              <span>简历投递至</span>
              <a href="mailto:hr@viewer.ink" className="email join">
                hr@viewer.ink
              </a>
            </div>
          </div>
          <div className={shadowClass} />
          <div className={detailPageClass}>
            <div className="detail-title">{job.title}</div>
            <div className="job-detail-title">工作描述</div>
            <div className="job-details">{descs}</div>
            <div className="job-detail-title">工作要求</div>
            <div className="job-details">{reqs}</div>
            <img className="close" src={Close} onClick={this.hideDetail} />
          </div>
        </div>
        <div className={this.state.classes.contact + "page"}>
          <div className="c-container">
            <div className="c-top">
              <div className="c-left">
                <div className="c-left-title">必览</div>
                <div className="c-left-sub">商务合作</div>
              </div>
              <div className="c-right">
                <div className="c-right-s">
                  致力于与留学及海外本地生活领域的商家通力合作，
                </div>
                <div className="c-right-s">
                  通过内容、工具与产品多维度赋能全球合作伙伴，
                </div>
                <div>精准触达用户，从全链条提供更优质的服务！</div>
              </div>
            </div>
            <div className="c-bottom">
              留学 | 语培 | 外卖 | 二手 | 中超 | 海外酒旅
            </div>
            <div className="j-email">
              <span>与必览团队进行商务合作，请联系</span>
              <a href="mailto:market@viewer.ink" className="email join">
                market@viewer.ink
              </a>
            </div>
          </div>
        </div>
        <div className={this.state.classes.article + "page"}>
          <div className="a-container">
            <div className="nav">
              <div className="text chi article">往期文章</div>
              {tabs}
            </div>
            <div id="articles" onScroll={this.handleScroll} ref={"container"}>
              <Element name="firstInsideContainer">
                <div className="blank">here</div>
              </Element>
              {articles}
            </div>
          </div>
          <Link
            onClick={this.onClick}
            activeClass="active"
            to="firstInsideContainer"
            duration={400}
            smooth={true}
            containerId="articles"
          >
            <img className={top} src={Top} />
          </Link>
        </div>
        <div className="menus text">
          <span id="list" className={list_class}>
            {buttons}
          </span>
          <img
            className="menu"
            className={menu_ani}
            onClick={this.openmenu}
            src={Menu}
          />
        </div>
        <div className="text chi footnote">
          必览 @2018 All rights reserved. 沪ICP备18027968号
        </div>
      </div>
    );
  }
}

export default App;
