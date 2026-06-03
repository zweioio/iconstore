// 图标名称单词 → 各语言翻译映射
const dict: Record<string, { zh: string; ja: string; ko: string }> = {
  // basic
  spark: { zh: '火花', ja: 'スパーク', ko: '불꽃' },
  grid: { zh: '网格', ja: 'グリッド', ko: '그리드' },
  frame: { zh: '框架', ja: 'フレーム', ko: '프레임' },
  stack: { zh: '堆叠', ja: 'スタック', ko: '스택' },
  panel: { zh: '面板', ja: 'パネル', ko: '패널' },
  layout: { zh: '布局', ja: 'レイアウト', ko: '레이아웃' },
  board: { zh: '面板', ja: 'ボード', ko: '보드' },
  dashboard: { zh: '仪表盘', ja: 'ダッシュボード', ko: '대시보드' },
  module: { zh: '模块', ja: 'モジュール', ko: '모듈' },
  window: { zh: '窗口', ja: 'ウィンドウ', ko: '윈도우' },
  tile: { zh: '平铺', ja: 'タイル', ko: '타일' },
  layer: { zh: '图层', ja: 'レイヤー', ko: '레이어' },
  scene: { zh: '场景', ja: 'シーン', ko: '씬' },
  card: { zh: '卡片', ja: 'カード', ko: '카드' },
  widget: { zh: '组件', ja: 'ウィジェット', ko: '위젯' },
  surface: { zh: '表面', ja: 'サーフェス', ko: '표면' },
  block: { zh: '区块', ja: 'ブロック', ko: '블록' },
  cluster: { zh: '集群', ja: 'クラスター', ko: '클러스터' },
  canvas: { zh: '画布', ja: 'キャンバス', ko: '캔버스' },
  section: { zh: '分区', ja: 'セクション', ko: '섹션' },
  view: { zh: '视图', ja: 'ビュー', ko: '뷰' },
  // arrow
  arrow: { zh: '箭头', ja: '矢印', ko: '화살표' },
  rise: { zh: '上升', ja: '上昇', ko: '상승' },
  loop: { zh: '循环', ja: 'ループ', ko: '루프' },
  upward: { zh: '向上', ja: '上向き', ko: '위로' },
  refresh: { zh: '刷新', ja: 'リフレッシュ', ko: '새로고침' },
  return: { zh: '返回', ja: '戻る', ko: '돌아가기' },
  rotate: { zh: '旋转', ja: '回転', ko: '회전' },
  bend: { zh: '弯曲', ja: '曲げ', ko: '굽힘' },
  share: { zh: '分享', ja: '共有', ko: '공유' },
  forward: { zh: '前进', ja: '前進', ko: '앞으로' },
  reload: { zh: '重载', ja: 'リロード', ko: '다시로드' },
  curve: { zh: '曲线', ja: 'カーブ', ko: '곡선' },
  redirect: { zh: '跳转', ja: 'リダイレクト', ko: '리디렉션' },
  trend: { zh: '趋势', ja: 'トレンド', ko: '트렌드' },
  cycle: { zh: '循环', ja: 'サイクル', ko: '사이클' },
  launch: { zh: '启动', ja: '起動', ko: '시작' },
  turn: { zh: '转向', ja: 'ターン', ko: '회전' },
  reply: { zh: '回复', ja: '返信', ko: '답장' },
  branch: { zh: '分支', ja: 'ブランチ', ko: '브랜치' },
  // edit
  pen: { zh: '笔', ja: 'ペン', ko: '펜' },
  edit: { zh: '编辑', ja: '編集', ko: '편집' },
  crop: { zh: '裁剪', ja: '切り抜き', ko: '자르기' },
  area: { zh: '区域', ja: 'エリア', ko: '영역' },
  pencil: { zh: '铅笔', ja: '鉛筆', ko: '연필' },
  adjust: { zh: '调整', ja: '調整', ko: '조정' },
  trim: { zh: '修剪', ja: 'トリム', ko: '트림' },
  select: { zh: '选择', ja: '選択', ko: '선택' },
  note: { zh: '笔记', ja: 'ノート', ko: '노트' },
  shape: { zh: '形状', ja: 'シェイプ', ko: '도형' },
  scale: { zh: '缩放', ja: '拡大縮小', ko: '확대축소' },
  ratio: { zh: '比例', ja: '比率', ko: '비율' },
  compose: { zh: '组合', ja: '構成', ko: '구성' },
  outline: { zh: '轮廓', ja: 'アウトライン', ko: '윤곽선' },
  mark: { zh: '标记', ja: 'マーク', ko: '마크' },
  // media
  play: { zh: '播放', ja: '再生', ko: '재생' },
  orbit: { zh: '轨道', ja: '軌道', ko: '궤도' },
  wave: { zh: '声波', ja: '波形', ko: '파형' },
  audio: { zh: '音频', ja: 'オーディオ', ko: '오디오' },
  radio: { zh: '广播', ja: 'ラジオ', ko: '라디오' },
  voice: { zh: '语音', ja: '音声', ko: '음성' },
  track: { zh: '音轨', ja: 'トラック', ko: '트랙' },
  stream: { zh: '直播', ja: 'ストリーム', ko: '스트림' },
  podcast: { zh: '播客', ja: 'ポッドキャスト', ko: '팟캐스트' },
  record: { zh: '录制', ja: '録画', ko: '녹화' },
  sound: { zh: '声音', ja: 'サウンド', ko: '소리' },
  music: { zh: '音乐', ja: '音楽', ko: '음악' },
  player: { zh: '播放器', ja: 'プレイヤー', ko: '플레이어' },
  video: { zh: '视频', ja: '動画', ko: '비디오' },
  volume: { zh: '音量', ja: '音量', ko: '볼륨' },
  session: { zh: '会话', ja: 'セッション', ko: '세션' },
  live: { zh: '直播', ja: 'ライブ', ko: '라이브' },
  // system
  shield: { zh: '盾牌', ja: 'シールド', ko: '방패' },
  check: { zh: '检查', ja: 'チェック', ko: '체크' },
  cloud: { zh: '云', ja: 'クラウド', ko: '클라우드' },
  sync: { zh: '同步', ja: '同期', ko: '동기화' },
  guard: { zh: '守护', ja: 'ガード', ko: '가드' },
  safe: { zh: '安全', ja: 'セーフ', ko: '안전' },
  backup: { zh: '备份', ja: 'バックアップ', ko: '백업' },
  verify: { zh: '验证', ja: '検証', ko: '검증' },
  update: { zh: '更新', ja: '更新', ko: '업데이트' },
  secure: { zh: '加密', ja: 'セキュア', ko: '보안' },
  service: { zh: '服务', ja: 'サービス', ko: '서비스' },
  online: { zh: '在线', ja: 'オンライン', ko: '온라인' },
  status: { zh: '状态', ja: 'ステータス', ko: '상태' },
  deploy: { zh: '部署', ja: 'デプロイ', ko: '배포' },
  recover: { zh: '恢复', ja: '復元', ko: '복구' },
  control: { zh: '控制', ja: '制御', ko: '제어' },
  health: { zh: '健康', ja: 'ヘルス', ko: '건강' },
  // brand
  chat: { zh: '聊天', ja: 'チャット', ko: '채팅' },
  badge: { zh: '徽章', ja: 'バッジ', ko: '뱃지' },
  star: { zh: '星标', ja: 'スター', ko: '별표' },
  burst: { zh: '爆发', ja: 'バースト', ko: '폭발' },
  shine: { zh: '闪耀', ja: 'シャイン', ko: '샤인' },
  message: { zh: '消息', ja: 'メッセージ', ko: '메시지' },
  community: { zh: '社区', ja: 'コミュニティ', ko: '커뮤니티' },
  highlight: { zh: '高亮', ja: 'ハイライト', ko: '하이라이트' },
  social: { zh: '社交', ja: 'ソーシャル', ko: '소셜' },
  featured: { zh: '精选', ja: 'おすすめ', ko: '추천' },
  notice: { zh: '通知', ja: '通知', ko: '알림' },
  banner: { zh: '横幅', ja: 'バナー', ko: '배너' },
  circle: { zh: '圈子', ja: 'サークル', ko: '서클' },
  lounge: { zh: '休息室', ja: 'ラウンジ', ko: '라운지' },
  focus: { zh: '焦点', ja: 'フォーカス', ko: '포커스' },
}

export function getIconLabel(name: string, lang: string): string {
  const parts = name.split('-')

  if (lang === 'ja') {
    const translated = parts.map((p) => dict[p]?.ja || p)
    return translated.join('')
  }

  if (lang === 'ko') {
    const translated = parts.map((p) => dict[p]?.ko || p)
    return translated.join(' ')
  }

  // zh / zh-TW 使用中文
  const translated = parts.map((p) => dict[p]?.zh || p)
  return translated.join('')
}
