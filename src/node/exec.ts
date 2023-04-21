import { gladosCheckin, v2freeCheckin, ikuuuCheckin } from './index'

const main = async () => {
  await Promise.allSettled([gladosCheckin(), v2freeCheckin(), ikuuuCheckin()]).then((results) => {
    console.log(results)
  })
}
main()
