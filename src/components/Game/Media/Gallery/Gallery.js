import { Image } from 'semantic-ui-react'
import { map } from 'lodash'
import styles from './Gallery.module.scss'
import { FullModal } from '@/components/Shared'
import { useState } from 'react'
import Slider from 'react-slick'
export function Gallery(props) {
  const { screenshots } = props
  const [show, setShow] = useState(false)
  const onOpenClose = () => setShow((prevState) => !prevState)
  const screenShotsClone = [...screenshots]
  const pricipalImage = screenShotsClone.shift()
  const setting = {
    dots: true,
    dotsClass: styles.dots,
    infinite: true,
    slidersToShow: 1,
    slidersToScroll: 1,
    arrows: false,
    customPaging: function (i) {
      return <Image src={screenshots[i].attributes.url} />
    }
  }
  return (
    <>
      <div className={styles.gallery}>
        <div className={styles.principal}>
          <Image src={pricipalImage.attributes.url} onClick={onOpenClose} />
        </div>
        <div className={styles.grid}>
          {map(screenShotsClone, (screenshot) => (
            <div key={screenshot.id}>
              <Image src={screenshot.attributes.url} onClick={onOpenClose} />
            </div>
          ))}
        </div>
      </div>
      <FullModal show={show} onClose={onOpenClose}>
        <div className={styles.carouselContainer}>
          <Slider {...setting}>
            {map(screenshots, (screenshot) => (
              <div key={screenshot.id}>
                <Image src={screenshot.attributes.url} />
              </div>
            ))}
          </Slider>
        </div>
      </FullModal>
    </>
  )
}
