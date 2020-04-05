# Arumon
## BenToGo
### Problem
日本では政府から週末の外出自粛の要請がおこなわれており、密閉・密集・密接を避けるように言われている。
これにより、飲食店など人が集まる場所で食事がとりづらくなっている。
日本の飲食店の多くは、店内での料理提供が売り上げの大部分だったため、客足が遠のき、売り上げが下がっている。
デリバリーサービスを開始した大手チェーン店もあるが、個人経営のお店の多くはITの利用にも疎く、まだまだオンラインでのサービス展開はおこなえていない。
（参考文献入れる）

The Japanese government requires people to avoid sealed/crowd/closed situations continuously and to manage to stay home during the weekend.
This requirement makes us harder to go to restaurant and eat something in there.
Most of restaurant in Japan earn from in-store services, then they are struggling the current situation.
Although some big companies started delivery service, there are a lot of restaurants cannot provide their service on the internet because they aren't used to IT.

### Solution
飲食店向けに、オンライン注文を受け付けるサイトを簡単に立ち上げられるサービス「BenToGo」を提供する。
レストランのオーナーは、スマートフォンから簡単に利用申込ができ、サイトを立ち上げることができる。
サイトでは、商品を登録し、オンラインサイトに公開する。

サイト利用者はリストから商品を選び、プレオーダーする。
その際、混雑具合から、取りに行く時間帯を選択することができる。
これにより、混在している時間を避けることができ、不要な人との接触を避け、新型コロナウイルスへの感染リスクを下げる。

We provide a service for restaurants to create an online ordering service easily and the service name is "BentToGo".
An owner of a restaurant can apply for the service by smartphone, and then they will get an online restaurant.
They can add the list of dishes on the site and publish the list.

People pre-order a dish/dishes via the online page.
Then, they can see congestion situation and select the pick-up time to avoid "crowd" environment.
We support to reduce the risk of infection for COVID-19 by this solution.


### Background
日本にも UberEats や、「出前」と呼ばれる各お店ごとが個別にもつ料理の配達文化が存在する。
現在、日本では感染拡大のニュースが連日報道されており、外出を控える人が増えているため、配達サービスの利用者は増加している、
（ドミノピザの配達員のニュースでも載せる？）
一方で、不特定多数の人間に接触する配達サービスを利用したくないと考える人も存在する。

日本には「弁当」という箱に詰められた持ち帰り用の料理の文化が存在する。
コンビニエンスストアなどでは多くの種類の弁当が販売されており、利用者も多い。
「BenToGo」は、プロの料理人が作成する「弁当」を、気軽に調達できる世界を提供する。
混雑や感染リスクを避けつつプロの料理を堪能したい利用者と、オンラインチャネルがないため、料理の提供方法に悩む飲食店とのマッチングをおこなう。

There are some delivery services like "UberEats" in Japan and also Japan has the culture of "Demae" that some restaurants have own delivery service.
The number of delivery service user is increasing because people stay home due to the news of expanding the number of the infections.
However, some people is unwilling to use these services because the delivery staffs meet with unspecified number of people in the day.

On the other hand, we have another culture.
It is the culture of "Bento".
"Bento" is the box that has various dishes.
For example, beef rice bowl, fried pork with rice and so on.
There are a lot of "Bento"s in convenience store in Japan and users as well.

We will provide the situation that people can freely get a "bento" made by cook.
We will support both users who would like to avoid the crowd situation/higher infection risk but enjoy eating delicious dishes and restaurants is worried how to serve dishes because of not having online channel.

### Overview of the service
- Owner of restaurant can create a new site via the application form
- We will get a notification when a new application is created
- We create a new site with our theme on Shopify platform and delegate it to the owner
- The site has the following features by default
  + list of dishes
  + pre-order
  + restaurant information
  + congestion map
  + usage of BenToGo (Available restaurants)

### System Architecture
## Front end
- Application form is made by ReactJS
- The list of applicants is managed by GoogleSpreadSheet
- The order management system works on Shopify

## Back end
- Congestion situation is calculated by Lambda
- Analytics is used for Google AppScript

### Future Work
- Promote the service with restaurants
- Automate the building/delegating process of the site
- Provide several kinds of theme for the site
