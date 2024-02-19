/* eslint-disable no-console */
import { Prisma, PrismaClient } from "@prisma/client";

const categoriesFixture: Prisma.CategoryCreateInput[] = [
  {
    name: "Button",
    description: "インタラクティブなボタンコンポーネント",
  },
  {
    name: "Accordion",
    description: "折り畳み可能なアコーディオンコンポーネント",
  },
  {
    name: "Dialog",
    description: "モーダルダイアログやポップアップ",
  },
  {
    name: "Card",
    description: "情報を表示するカードコンポーネント",
  },
  {
    name: "Avatar",
    description: "ユーザーアバターを表示するコンポーネント",
  },
  { name: "Form", description: "入力フォームやフォーム要素" },
  {
    name: "Table",
    description: "データテーブル表示コンポーネント",
  },
  {
    name: "Menu",
    description: "メニューとナビゲーションコンポーネント",
  },
  {
    name: "Tooltip",
    description: "情報提示のためのツールチップコンポーネント",
  },
  { name: "Tabs", description: "タブ切り替えコンポーネント" },
  {
    name: "Alert",
    description: "警告や通知を表示するアラートコンポーネント",
  },
  {
    name: "Spinner",
    description: "ローディング表示のためのスピナーコンポーネント",
  },
  {
    name: "Breadcrumb",
    description: "ナビゲーションパスを表示するブレッドクラムコンポーネント",
  },
  {
    name: "Pagination",
    description: "ページネーションコンポーネント",
  },
  {
    name: "Progress",
    description: "進行状況を表示するプログレスバーコンポーネント",
  },
  {
    name: "Badge",
    description: "ステータスや通知を表示するバッジコンポーネント",
  },
  {
    name: "Carousel",
    description:
      "画像やコンテンツのスライドショーを表示するカルーセルコンポーネント",
  },
  {
    name: "Drawer",
    description: "サイドからスライドするドロワーコンポーネント",
  },
  {
    name: "Stepper",
    description:
      "ステップバイステップの進行状況を表示するステッパーコンポーネント",
  },
  {
    name: "Timeline",
    description: "時間軸に沿ったイベントを表示するタイムラインコンポーネント",
  },
  {
    name: "Chip",
    description: "コンパクトな要素を表示するチップコンポーネント",
  },
  {
    name: "Snackbar",
    description: "一時的なメッセージを表示するスナックバーコンポーネント",
  },
  {
    name: "Rating",
    description: "評価を表示するレーティングコンポーネント",
  },
  {
    name: "Slider",
    description: "値の範囲を選択するスライダーコンポーネント",
  },
  {
    name: "Switch",
    description: "オン/オフの切り替えを行うスイッチコンポーネント",
  },
  {
    name: "AppBar",
    description: "アプリケーションの上部に配置するアプリバーコンポーネント",
  },
  {
    name: "Paper",
    description: "マテリアルデザインの紙面を模したコンポーネント",
  },
  {
    name: "Backdrop",
    description: "背景に覆いかぶさるバックドロップコンポーネント",
  },
  {
    name: "Other",
    description: "その他のコンポーネント",
  },
];

const prisma = new PrismaClient();

async function main() {
  categoriesFixture.forEach(async (category) => {
    await prisma.category.create({
      data: category,
    });
  });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
