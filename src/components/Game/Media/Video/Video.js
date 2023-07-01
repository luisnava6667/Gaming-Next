import styles from './Video.module.scss'
import ReactPlayer from 'react-player'
export function Video(props) {
    const { video } = props
  return (
    <ReactPlayer url={video} className={styles.video} controls={true} width='100%' height={634} />
  )
}
