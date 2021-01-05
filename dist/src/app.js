import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
import imagesLoaded from 'imagesloaded';
import m from 'mithril'
import anime from 'animejs'
import LocomotiveScroll from 'locomotive-scroll'
import Cursor from './js/cursor'
import {
  lerp,
  getMousePos
} from './js/utils'

let main = document.querySelector('main')

let projects = {
  glebik: {
    '08.2019': [
      'src/assets/img/glebik/glebik1.jpg',
      'src/assets/img/glebik/glebik2.jpg'
    ]
  },
  matteo: {
    '06.2019': [
      'src/assets/img/matteo/matteo1.jpg',
      'src/assets/img/matteo/matteo2.jpg'
    ]
  },
  motodeva: {
    '04.2019': [
      'src/assets/img/motodeva/motodeva1.jpg',
      'src/assets/img/motodeva/motodeva2.jpg'
    ]
  },
  roberta: {
    '02.2019': [
      'src/assets/img/roberta/roberta1.jpg',
      'src/assets/img/roberta/roberta2.jpg'
    ]
  }
}

let projectNames = Object.keys(projects)

let Nav = {
  view(vnode) {
    return m('.nav.space-between', [
      m('.rounded.home-link', m('a[href=#]', 'Elena Kustova')),
      m('a', 'About')
    ])
  }
}
let Home = {
  activeTitle: '',
  slidesIndex: 0,
  slidesLength: 0,
  picturesObj: {},
  pictures: [],
  prev(vnode) {
    console.log(vnode);
    let projects = document.querySelectorAll('.project-title')

    let slides = document.querySelectorAll('.slide')
    let previews = document.querySelectorAll('.preview-slide')
    let active = document.querySelector('.slide.active')
    let activePreview = document.querySelector('.preview-slide.active')


    active.classList.toggle('active')
    active.classList.toggle('behind')
    activePreview.classList.toggle('active')
    activePreview.classList.toggle('behind')

    animProjectsOut(vnode.state.slidesIndex)

    if (vnode.state.slidesIndex - 1 === -1) {
      vnode.state.slidesIndex = slides.length - 1
    } else {
      vnode.state.slidesIndex -= 1
    }
    animProjectsIn(vnode.state.slidesIndex)

    console.log(vnode.state.slidesIndex);

    slides[vnode.state.slidesIndex].classList.toggle('active')
    previews[vnode.state.slidesIndex].classList.toggle('active')

    setTimeout(() => {
      active.classList.toggle("behind");
      activePreview.classList.toggle("behind");
    }, 1000);
  },
  next(vnode) {
    let projects = document.querySelectorAll('.project-title')

    let slides = document.querySelectorAll('.slide')
    let previews = document.querySelectorAll('.preview-slide')
    let active = document.querySelector('.slide.active')
    let activePreview = document.querySelector('.preview-slide.active')


    active.classList.toggle('active')
    active.classList.toggle('behind')
    activePreview.classList.toggle('active')
    activePreview.classList.toggle('behind')

    animProjectsOut(vnode.state.slidesIndex)

    if (vnode.state.slidesIndex + 1 === slides.length) {
      vnode.state.slidesIndex = 0
    } else {
      vnode.state.slidesIndex += 1
    }
    animProjectsIn(vnode.state.slidesIndex)

    slides[vnode.state.slidesIndex].classList.toggle('active')
    previews[vnode.state.slidesIndex].classList.toggle('active')

    setTimeout(() => {
      active.classList.toggle("behind");
      activePreview.classList.toggle("behind");
    }, 1000);
  },
  oninit(vnode) {
    // get all images from projects
    for (let key in projects) {
      vnode.state.picturesObj[key] = []
      Object.values(projects[key])[0].forEach((url, i) => {
        vnode.state.picturesObj[key].push(url)
        vnode.state.pictures.push(url)
      });
    }
  },
  oncreate(vnode) {
    Splitting()
    imagesLoaded('.slides img', (imgLoad) => {
      //initialize smoothscrolll
      const scroll = new LocomotiveScroll({
        el: document.querySelector('main'),
        smooth: true
      });
    })
    titlesHandler('current', 'home')


    // initialize custom cursor
    new Cursor(document.querySelector('svg.cursor'));


    vnode.state.slidesLength = document.querySelectorAll('.slide').length
    m.redraw()
    let slides = document.querySelector('.slides')
    slides.addEventListener('mouseenter', () => {
      document.querySelector('.work-title-wrapper').classList.add('translate')
    });
    slides.addEventListener('mouseleave', () => {
      document.querySelector('.work-title-wrapper').classList.remove('translate')
    });
  },
  view(vnode) {
    let projectDate = Object.keys(Object.values(projects)[vnode.state.slidesIndex])
    return [
      m(Nav),
      m('.title-wrapper',
        m("section.content__item.content__item--home.content__item--current[data-scroll-speed=2][data-scroll]",
          m(".content__paragraph[data-splitting=''][data-scroll]",
            "Elena Kustova"
          ),
          m(".content__paragraph[data-splitting='']", 'Russian'),
          m(".content__paragraph[data-splitting='']", 'Photographer'),
          m(".content__paragraph[data-splitting='']", 'Based in Italy'),
        ),
        m("section.content__item.content__item--about",
          m(".content__paragraph[data-splitting='']",
            "About"
          ),
          m(".content__paragraph[data-splitting='']",
            "Me"
          )
        ),
        m('.divider',
          m('.divider-text', 'find my projects below')
        )
      ),
      m('.gallery', [
        m('.slides-wrapper',
          m('.work-selector-wrapper.grid', [
            m('.preview[data-scroll][data-scroll-speed=-2]',
              [
                m('.project-index', `${vnode.state.slidesIndex+1} / ${vnode.state.slidesLength}`),
                m('.preview-slides',
                  m('.preview-slide.active', {
                    style: 'background-image: url("/src/assets/img/glebik/glebik1.jpg");'
                  }),
                  m('.preview-slide', {
                    style: 'background-image: url("/src/assets/img/matteo/matteo1.jpg")'
                  }),
                  m('.preview-slide', {
                    style: 'background-image: url("/src/assets/img/motodeva/motodeva1.jpg")'
                  }),
                  m('.preview-slide', {
                    style: 'background-image: url("/src/assets/img/roberta/roberta1.jpg")'
                  })),
                m('.buttons.space-between', [
                  m('.button.flex.prev', {
                      onclick: () => {
                        vnode.state.prev(vnode)
                      }
                    },
                    m("svg.arrows.arrow-left[xmlns='http://www.w3.org/2000/svg'][width='24'][height='24'][viewBox='0 0 24 24'][fill='none'][stroke='currentColor'][stroke-width='2'][stroke-linecap='round'][stroke-linejoin='round']",
                      [
                        m("line[x1='19'][y1='12'][x2='5'][y2='12']"),
                        m("polyline[points='12 19 5 12 12 5']")
                      ]
                    ), m('.text', 'prev')),
                  m('.button.flex.next', {
                      onclick(e) {
                        vnode.state.next(vnode)
                      }
                    },
                    m('.text', 'next'),
                    m("svg.arrows.arrow-right[xmlns='http://www.w3.org/2000/svg'][width='24'][height='24'][viewBox='0 0 24 24'][fill='none'][stroke='currentColor'][stroke-width='2'][stroke-linecap='round'][stroke-linejoin='round']",
                      [
                        m("line[x1='5'][y1='12'][x2='19'][y2='12']"),
                        m("polyline[points='12 5 19 12 12 19']")
                      ]
                    )
                  )
                ])
              ],
              [
                m('.project-titles.flex-column', projectNames.map((name, i) => {
                  return m(`h1.project-title.project-${name}[index=${i}]`, projectNames[i])
                }))
              ]
            )
          ]),
          m('.slides',
            m('.work-title-wrapper', [
              m('p.work-title', `- ${projectDate} -`),
              m('p.explore-project', 'explore')
            ]), m('.slide.active', m('img', {
              src: 'src/assets/img/glebik/glebik1.jpg'
            })),
            m('.slide', m('img', {
              src: 'src/assets/img/matteo/matteo1.jpg'
            })),
            m('.slide', m('img', {
              src: 'src/assets/img/motodeva/motodeva1.jpg'
            })),
            m('.slide', m('img', {
              src: 'src/assets/img/roberta/roberta1.jpg'
            })),
          )
        ),
        m('.divider',
          m('.divider-text', 'some of my pictures')
        ),
        m('.gallery-pictures-wrapper',
          // m('.gallery-pic', m('img[data-scroll]', {
          //   src: 'src/assets/img/glebik/glebik2.jpg'
          // })),
          // m('.gallery-pic', m('img[data-scroll]', {
          //   src: 'src/assets/img/matteo/matteo2.jpg'
          // })),
          // m('.gallery-pic', m('img[data-scroll]', {
          //   src: 'src/assets/img/motodeva/motodeva2.jpg'
          // })),
          // m('.gallery-pic', m('img[data-scroll]', {
          //   src: 'src/assets/img/roberta/roberta2.jpg'
          // })),

          projectNames.map((key, i) => {
            return vnode.state.picturesObj[key].map((url, y) => {
              return m('.gallery-pic', m(`.img-wrapper[data-scroll][data-scroll-speed=${i+1}]`, m(`img[title=${key}]`, {
                  src: url,
                  onmouseenter: (e) => {
                    let title = document.querySelector(`.pic-title.title-${key}.title-${y}`)
                    title.classList.remove('hidden')
                    title.classList.add('animated')
                  },
                  onmouseleave: () => {
                    let title = document.querySelector(`.pic-title.title-${key}.title-${y}`)
                    title.classList.remove('animated')
                    title.classList.add('hidden')
                  }
                }),
                m('.title-wrapper',
                  m(`.pic-title.title-${key}.title-${y}.hidden`, key))
              ))
            })
          })
        )
      ]),
      m('.divider[data-scroll]'),
      m('.footer[data-scroll]',
        m('.links.flex',
          m('.insta-link',
            m('.insta-link-text', 'instagram'),
            m("svg.css-i6dzq1[viewBox='0 0 24 24'][width='24'][height='24'][stroke='currentColor'][stroke-width='2'][fill='none'][stroke-linecap='round'][stroke-linejoin='round']",
              [
                m("rect[x='2'][y='2'][width='20'][height='20'][rx='5'][ry='5']"),
                m("path[d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z']"),
                m("line[x1='17.5'][y1='6.5'][x2='17.51'][y2='6.5']")
              ]
            )),
          m('.vk-link',
            m('.vk-link-text', 'vkontakte'),
            m("svg[version='1.1'][id='Layer_1'][xmlns='http://www.w3.org/2000/svg'][xmlns:xlink='http://www.w3.org/1999/xlink'][x='0px'][y='0px'][viewBox='0 0 304.36 304.36'][xml:space='preserve']", {
                "style": {
                  "enable-background": "new 0 0 304.36 304.36"
                }
              },
              [
                m("g[id='XMLID_1_']",
                  m("path[id='XMLID_807_'][d='M261.945,175.576c10.096,9.857,20.752,19.131,29.807,29.982 c4,4.822,7.787,9.798,10.684,15.394c4.105,7.955,0.387,16.709-6.746,17.184l-44.34-0.02c-11.436,0.949-20.559-3.655-28.23-11.474 c-6.139-6.253-11.824-12.908-17.727-19.372c-2.42-2.642-4.953-5.128-7.979-7.093c-6.053-3.929-11.307-2.726-14.766,3.587 c-3.523,6.421-4.322,13.531-4.668,20.687c-0.475,10.441-3.631,13.186-14.119,13.664c-22.414,1.057-43.686-2.334-63.447-13.641 c-17.422-9.968-30.932-24.04-42.691-39.971C34.828,153.482,17.295,119.395,1.537,84.353C-2.01,76.458,0.584,72.22,9.295,72.07 c14.465-0.281,28.928-0.261,43.41-0.02c5.879,0.086,9.771,3.458,12.041,9.012c7.826,19.243,17.402,37.551,29.422,54.521 c3.201,4.518,6.465,9.036,11.113,12.216c5.142,3.521,9.057,2.354,11.476-3.374c1.535-3.632,2.207-7.544,2.553-11.434 c1.146-13.383,1.297-26.743-0.713-40.079c-1.234-8.323-5.922-13.711-14.227-15.286c-4.238-0.803-3.607-2.38-1.555-4.799 c3.564-4.172,6.916-6.769,13.598-6.769h50.111c7.889,1.557,9.641,5.101,10.721,13.039l0.043,55.663 c-0.086,3.073,1.535,12.192,7.07,14.226c4.43,1.448,7.35-2.096,10.008-4.905c11.998-12.734,20.561-27.783,28.211-43.366 c3.395-6.852,6.314-13.968,9.143-21.078c2.096-5.276,5.385-7.872,11.328-7.757l48.229,0.043c1.43,0,2.877,0.021,4.262,0.258 c8.127,1.385,10.354,4.881,7.844,12.817c-3.955,12.451-11.65,22.827-19.174,33.251c-8.043,11.129-16.645,21.877-24.621,33.072 C252.26,161.544,252.842,166.697,261.945,175.576L261.945,175.576z M261.945,175.576']", {
                    "style": {
                      "fill-rule": "evenodd",
                      "clip-rule": "evenodd"
                    }
                  })
                ),
                m("g", ),
                m("g", ),
                m("g", ),
                m("g", ),
                m("g", ),
                m("g", ),
                m("g", ),
                m("g", ),
                m("g", ),
                m("g", ),
                m("g", ),
                m("g", ),
                m("g", ),
                m("g", ),
                m("g", ),
                m("style[xmlns='http://www.w3.org/1999/xhtml'][type='text/css']")
              ]
            )),
          m('.mail-link',
            m('.mail-link-text', 'mail'),
            m("svg.css-i6dzq1[viewBox='0 0 24 24'][width='24'][height='24'][stroke='currentColor'][stroke-width='2'][fill='none'][stroke-linecap='round'][stroke-linejoin='round']",
              [
                m("path[d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z']"),
                m("polyline[points='22,6 12,13 2,6']")
              ]
            ))
        )
      )
    ]
  }
}

m.mount(main, Home)


anime({
  targets: `.project-title[index="0"]`,
  translateY: -50,
  opacity: 1,
  duration: 500,
  // stagger: 20
})


function animProjectsIn(index) {
  return anime({
    targets: `.project-title[index="${index}"]`,
    translateY: [100, -50],
    opacity: 1,
    duration: 500,
    stagger: 20,
    // delay: 500,
    easing: 'easeInOutExpo'
  })
}

function animProjectsOut(index) {
  // index = index === 0 ? 4 : index
  return anime({
    targets: `.project-title[index="${index}"]`,
    translateY: -100,
    // rotate: -10,
    opacity: 0,
    stagger: 20,
    duration: 500,
    easing: 'easeInOutExpo'
  })
}

function titlesHandler(status, page) {

  let targets, nextPage
  if (page == 'home') {
    targets = `.content__item--home` + ' .word .char, .whitespace'
  } else {
    targets = `.content__item--current` + ' .word .char, .whitespace'
    nextPage = page == 'about' ? 'about' : 'home'
  }
  let content

  return anime({
    targets,
    direction: status == 'current' ? 'reverse' : 'normal',
    // translateY: -200,
    translateY: status == 'current' ? -300 : 300,
    // rotate: 50,
    opacity: 1,
    duration: 1000,
    easing: 'easeInOutExpo',
    autoplay: false,
    loop: 1,
    delay: anime.stagger(10, {
      from: 'center'
    }),
    begin: (anim) => {

    },
    complete: (anim) => {
      if (status == 'current' && page != 'home') {
        // let item = document.querySelector('.content__item--current')
        // item.classList.remove('content__item--current')
      } else if (status == 'changing') {
        let current = document.querySelector('.content__item--current')
        if (current.classList.toString().search('home') != -1) {
          //if home is the current page
          current.classList.remove('content__item--current')
          document.querySelector('.content__item--about').classList.add('content__item--current')
          titlesHandler('current')
        } else {
          current.classList.remove('content__item--current')
          document.querySelector('.content__item--home').classList.add('content__item--current')
        }
      }
    }
  }).play()
};

function query(sel) {
  let obj = document.querySelector(sel)
  return obj
}