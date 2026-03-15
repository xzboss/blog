import { Terminal } from '../Terminal';
import './index.css';

export function HomeLayout() {
  return (
    <div className="home-container">
      <Terminal
        commands={[
          'cd ~',
          'cat skills.md',
        ]}
        outputs={{
          1: [
            '# xzboss',
            'thinking...',
            'thinking...',
            'thinking...',
            'Agent · MCP · Tool · Skills · Workflow · RAG · Memory',
            '',
            'HTML5 · CSS3 · JavaScript · TypeScript · ES6+ · PHP · Golang · Python',
            '',
            'Vue 2 · Vue 3 · React 17 · React 18+ · Nuxt · Next.js · Taro · Umi',
            '',
            'Element UI · Element Plus · Ant Design Vue · NutUI',
            'ECharts · Lodash · Day.js · Axios · Canvas · SVG · Leaflet · Motion',
            '',
            'Vuex · Pinia · Redux · Dva',
            '',
            'Vite · Webpack · Rollup · Babel · CommonJS · ESM',
            'npm · pnpm · Yarn · Git',
            '',
            'Node · Deno · Express · MySQL · MongoDB · Mongoose',
            '',
            'SSR · SSG · SEO · Rspress',
            '...',
          ],
        }}
        typingSpeed={45}
        delayBetweenCommands={800}
        enableSound={true}
      />
    </div>
  );
}
