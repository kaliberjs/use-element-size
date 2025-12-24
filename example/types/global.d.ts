declare const cx: typeof import('classnames').default

declare module '*.css' {
  const x: { [any: string]: string }
  export default x
}
