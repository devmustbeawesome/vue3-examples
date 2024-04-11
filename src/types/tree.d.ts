export default interface Tree {
  id: number
  name: string
  children?: Array<Tree>
  opened?: boolean
}
