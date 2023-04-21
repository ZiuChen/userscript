import FormData from 'form-data'

export function dateFormat(fmt: string) {
  const d = new Date()
  const opt = {
    'Y+': d.getFullYear().toString(),
    'M+': (d.getMonth() + 1).toString(),
    'D+': d.getDate().toString(),
    'H+': d.getHours().toString(),
    'm+': d.getMinutes().toString(),
    'S+': d.getSeconds().toString()
  }
  let ret
  for (let k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      // @ts-ignore
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'))
    }
  }
  return fmt
}

export function obj2FormData(data: Record<string, string>) {
  const form = new FormData()
  for (const key in data) {
    form.append(key, data[key])
  }
  return form
}
