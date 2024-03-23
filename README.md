<img src="https://github.com/uutan58/roulettev2/assets/138564916/307042ef-0c58-47e7-8785-f19981aef234" width= "1200px">

<br />

## サービスのURL

https://roulettev2.vercel.app

<br />

## サービス概要

飲むお酒に迷ったときにルーレットで決められるアプリです。

<br />

## アプリを作ったきっかけ

居酒屋でお酒を飲んでいるときに何を飲もうか迷うことがあり、
ルーレットで決められたらと思い作成に至りました。

また、Reactを使用したアプリを作ってみたかったためです。

<br />

## アプリケーションのイメージ
![アプリケーションのイメージ](https://github.com/uutan58/roulettev2/assets/138564916/da3958bb-db8b-4ec8-bf6d-e54066cf1801)

<br />

## 機能一覧
| ホーム画面 |　ホーム画面 |
| ---- | ---- |
| <img src= "https://github.com/uutan58/roulettev2/assets/138564916/7072a4c7-17f9-413e-8dfb-685bf7a84239"  width= "600px"> |  ![スマホホーム画面](https://github.com/uutan58/roulettev2/assets/138564916/d404b1c1-9b2d-4c82-b06d-41679da2f75d) |
| 「乾杯する」を押下することでルーレット画面へ遷移します | 同左 |

| ルーレット画面 |　ルーレット画面 |
| ---- | ---- |
| ![PCルーレット画像](https://github.com/uutan58/roulettev2/assets/138564916/f6d18fe3-e46b-4f08-864d-22231377ef2b) | ![スマホルーレット画面](https://github.com/uutan58/roulettev2/assets/138564916/da23f1bd-e500-4b42-a044-1f2fbd124ba3) |
| 「START」を押下することでルーレットが出現、回転が始まります。<br />「STOP」を押下すると回転速度を落としながらルーレットが止まります。| PCに比べると少し緩やかにルーレットが止まります。 |

| アイテムセレクト画面 |　アイテムセレクト画面 |
| ---- | ---- |
| ![モーダル画面](https://github.com/uutan58/roulettev2/assets/138564916/fd319d49-01c9-48d9-901b-04d21085cd33) | ![モーダル画面](画像ディレクトリを記述) |
| 矢印のところで止まったアイテムをモーダルに表示させます。<br />モーダル画面で表示されるコメントはランダムになっています。<br />また、「おかわり」を押下するとルーレット画面へ、「お会計」を押下するとお会計画面へ遷移します。 | 同左 |

| アイテム編集 |　アイテム編集 |
| ---- | ---- |
| ![アイテム編集画像](https://github.com/uutan58/roulettev2/assets/138564916/3781c257-37f9-402a-9451-2aaa105e354f) | ![アイテム編集画像](https://github.com/uutan58/roulettev2/assets/138564916/492dcbd0-2508-443a-bd48-5fb1cc8721cb) |
| ルーレット下部にあるアイテムリストから、アイテム名を変更することができます。 | 同左 |

| ストック表示 |　ストック表示 |
| ---- | ---- |
| ![ストック画像](https://github.com/uutan58/roulettev2/assets/138564916/6959033b-6f38-47d2-a966-7510100ca7c2) | ![ストック画像](https://github.com/uutan58/roulettev2/assets/138564916/52b88ec0-d74b-442e-8580-8a2e754b79dc) |
| 「START、STOPボタン」の上に、ルーレットで出たアイテムのアイコン（画像赤枠内）が表示されていきます。 | 同左 |

| お会計画面 |　お会計画面 |
| ---- | ---- |
| ![お会計画面画像](https://github.com/uutan58/roulettev2/assets/138564916/47af4b29-e9f0-447f-9e2a-e491cfeb89eb) | ![お会計画面画像](https://github.com/uutan58/roulettev2/assets/138564916/1747c0e6-b6b2-410f-b698-b99eac1c2f30) |
| ルーレットで出たアイテムの一覧を表示します。<br />「Xで反省」を押下するとアイテム一覧をXでポストすることができます。<br />また、「帰宅する」を押下するとホーム画面へ遷移します。 | 同左 |

<br />

## 使用技術

#### フロントエンド
<img src="https://img.shields.io/badge/-React-555.svg?logo=react&style=popout">

<img src="https://img.shields.io/badge/-JavaScript-276DC3.svg?logo=javascript&style=popout">

#### インフラ

<img src="https://img.shields.io/badge/-vercel-000.svg?logo=vercel&style=popout">

#### その他

<img src="https://img.shields.io/badge/-github-181717.svg?logo=github&style=popout">


## 今後の展望
- 現在は、アプリ内にルーレットのアイテム一覧を記録することができないため、Xへのポストを利用して記録を残せるようにしています。<br />今後はデータベースやバックエンドを使用して、アプリ内に記録を残せるように改良したいです。