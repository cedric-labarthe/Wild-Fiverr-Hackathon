/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Section2 from './Section2';
import Section3 from './Section3';

// Import accordion components
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from 'react-accessible-accordion';

// import Swiper core and required modules
import SwiperCore, { Navigation, A11y, EffectFade, Autoplay } from 'swiper';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper-bundle.css';

import images from '../../utils/homeImages';
SwiperCore.use([Navigation, A11y, EffectFade, Autoplay]);

const items = [
  {
    uuid: 1,
    heading: 'Get help finding your ideal niche',
    content: (
      <>
        <h3>
          You're amazing at that thing you do... and we know you want to share
          it
        </h3>
        <div>
          Your mentor will help you identify gaps in the market, teach you how
          to adapt your gig offers and guide you in amplifying the reach of your
          skillset.
        </div>
      </>
    ),
  },
  {
    uuid: 2,
    heading: 'Learn how to precisely pitch your gigs',
    content: (
      <>
        <h3>
          Enabling your focus on your talents is the bottom line of all our
          efforts
        </h3>
        <div>
          The start is always a difficult time. With seasoned advice on how to
          interact and communicate with buyers, you'll break into the market
          that much quicker.
        </div>
      </>
    ),
  },
  {
    uuid: 3,
    heading: 'Build relationships for a profitable future',
    content: (
      <>
        <h3>The Community that Knows Itself, Grows Itself</h3>
        <div>
          This is so much more than chasing the next gig ; we're building the
          Future of Work, and solidarity in our community of sellers is a core
          part of this.
        </div>
      </>
    ),
  },
];

export default function Home() {
  return (
    <div>
      <div className='info'>
        <div className='content'>
          <div className='head'>
            <h1>
              Find the perfect <span style={{ color: '#00732e' }}>mentor</span>{' '}
              for your freelance growth
            </h1>
            <div>
              Fiverr Senpai - grow your business with expert know-how and
              support from pillars of the community
            </div>

            <Link to='/products'>
              <button>Get Started</button>
            </Link>
          </div>
          <div className='concept'>
            <Accordion className='accordion' allowZeroExpanded>
              {items.map((item) => (
                <AccordionItem
                  activeClassName='accordion__active'
                  className='accordion__item'
                  key={item.uuid}
                >
                  <AccordionItemHeading>
                    <AccordionItemButton className='accordion__button'>
                      {item.heading}
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel className='accordion__panel'>
                    {item.content}
                  </AccordionItemPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <Swiper
          effect='fade'
          autoplay
          loop
          fadeEffect={{ crossFade: true }}
          speed={700}
          slidesPerView={1}
          // navigation
        >
          {images.map((image) => (
            <SwiperSlide key={image.id}>
              <img
                className='swiper__image'
                src={image.url}
                alt={image.desc}
                key={image.id}
              />
              {image.desc ? (
                <div className='swiper__text' key={image.id}>
                  {' '}
                  <div
                    style={{ position: 'relative' }}
                    className='swiptext'
                    key={image.id}
                  >
                    {image.desc}
                  </div>
                </div>
              ) : image.desc2 ? (
                <div className='swiper__text2' key={image.id}>
                  {' '}
                  <div
                    style={{ position: 'relative' }}
                    className='swiptext'
                    key={image.id}
                  >
                    {image.desc2}
                  </div>
                </div>
              ) : image.desc3 ? (
                <div className='swiper__text3' key={image.id}>
                  {' '}
                  <div
                    style={{ position: 'relative' }}
                    className='swiptext'
                    key={image.id}
                  >
                    {image.desc3}
                  </div>
                </div>
              ) : null}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div>
        <Section2></Section2>
        <Section3></Section3>
      </div>
    </div>
  );
}
