import { useFrontmatter, usePage, useSite } from '@rspress/core/runtime';
import './index.css';

function formatDate(raw: string | Date): string {
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return String(raw);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export function LastUpdated() {
  const {
    page: { lastUpdatedTime },
  } = usePage();
  const { site } = useSite();
  const showLastUpdated = site.themeConfig.lastUpdated;
  const { frontmatter } = useFrontmatter();
  const createTime = (frontmatter as Record<string, unknown>)?.createTime as
    | string
    | undefined;


  if (!showLastUpdated && !createTime) {
    return null;
  }

  return (
    <div className="rp-last-updated">
      {createTime && (
        <p>
          创建时间: <span>{formatDate(createTime)}</span>
        </p>
      )}
      {showLastUpdated && lastUpdatedTime && (
        <p>
          最后更新: <span>{lastUpdatedTime}</span>
        </p>
      )}
    </div>
  );
}
