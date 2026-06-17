import { watch } from 'fs'
import { exec } from 'child_process'
import path from 'path'

const svgDir = path.resolve(import.meta.dirname, '../src/icons/svg')

console.log('👀 监听 SVG 文件变化中... 添加或修改文件后自动更新图标。')

// 延迟执行，避免保存过程中多次触发
let timer = null
watch(svgDir, { recursive: true }, (eventType, filename) => {
  if (!filename || !filename.endsWith('.svg')) return
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    console.log(`📦 检测到 SVG 变化，重新生成图标数据...`)
    exec('npm run build-icons', { cwd: path.resolve(import.meta.dirname, '..') }, (err, stdout) => {
      if (err) return console.error('❌', err.message)
      console.log(stdout.trim())
      console.log('✅ 图标已更新，刷新网站即可查看')
    })
  }, 500)
})
