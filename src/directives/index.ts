import vFocus from '@/directives/vFocus'
import vIntersection from '@/directives/vIntersection'
import vClickOutside from '@/directives/vClickOutside'
import type { Directive } from 'vue'

export default [vFocus, vIntersection, vClickOutside] as Array< Directive & { name: string }>
