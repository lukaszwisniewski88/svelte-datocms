import type {MetaEntry} from 'datocms-structured-text-utils'
export function metaToAttributes(meta:MetaEntry[]):Record<string, string> {
    if(!meta) return {}
    const attributes = {}
    meta.forEach(metaElement => {
        attributes[metaElement.id] = metaElement.value
    })
    return attributes
}