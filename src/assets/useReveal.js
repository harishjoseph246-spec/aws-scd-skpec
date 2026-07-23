import { useEffect, useRef } from 'react'

/**
 * Attach to any element. Adds 'visible' class when it enters the viewport.
 * @param {object} opts
 * @param {number}  opts.threshold  – 0-1, default 0.12
 * @param {string}  opts.rootMargin – default "0px 0px -60px 0px"
 * @param {boolean} opts.once       – unobserve after first trigger (default true)
 */
export function useReveal({ threshold = 0.12, rootMargin = '0px 0px -60px 0px', once = true } = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          if (once) obs.unobserve(el)
        }
      },
      { threshold, rootMargin }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, rootMargin, once])
  return ref
}

/**
 * Observe all children of the returned ref and stagger their reveal.
 * Children need the class: reveal, reveal-left, reveal-right, reveal-scale, or reveal-flip
 */
export function useRevealChildren({ threshold = 0.1, rootMargin = '0px 0px -40px 0px' } = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const parent = ref.current
    if (!parent) return
    const children = parent.querySelectorAll(
      '.reveal,.reveal-left,.reveal-right,.reveal-scale,.reveal-flip,.reveal-blur'
    )
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold, rootMargin }
    )
    children.forEach((c) => obs.observe(c))
    return () => obs.disconnect()
  }, [threshold, rootMargin])
  return ref
}
