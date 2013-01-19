# jquery-loadprogress-plugin

## Description

HTML上の画像の読込状況を表示するjQueryのプラグインです。

## Useage

下記を呼び出すだけです。

	$.loadprogress();

### オプション値の一覧

*	**imgSelector**

	読み込む画像のセレクターをStringで渡します。デフォルトは 'img' です。

*	**easing**

	オーバーレイのフェードアウトのイージングをStringで渡します。デフォルトは 'swing' です。

*	**duration**

	オーバーレイのフェードアウトの秒数をNumber又はString（'fast'又は'slow'）で渡します。デフォルトは 1000 です。	

*	**showText**

	読込のパーセンテージを表示するかどうかをBooleanで渡します。デフォルトは true で表示します。	

*	**bodyOverflowFixTo**

	オーバーレイを非表示にした後に、bodyのoverflowを設定する値をBoolean又は文字列（'hidden'や'auto'など）です。

*	**manualMode**

	読込完了のタイミングを手動でコントロールするかどうかをBooleanで渡します。デフォルトは false でマニュアルモードは使用しません。	

*	**manualModeStopNum**

	マニュアルモードの際に読み込みの表示を止めるパーセンテージをNumberで指定します。デフォルトは 95 です。

### マニュアルモード

マニュアルモードをオンにしている場合で、オーバーレイをフェードアウトさせるには、

	$(window).trigger('loadprogressManualEnd');

と、手動で 'loadprogressManualEnd' イベントを発火させてください。

### イベント

#### loadprogressProgress
ロード中は window で 'loadprogressProgress' イベントが、画像のロードが1枚完了するたびに発生します。
下記のようにすることで、読込完了の枚数を取得することも可能です。

	$(window).on('loadprogressProgress',function(event,loadedNum){
		//event : イベントオブジェクト
		//loadedNum : 読込が完了した画像の枚数
	});

#### loadprogressEnd
全ての画像のロード完了時に window にて 'loadprogressEnd' イベントが発生します。オーバーレイのフェードアウトの開始はこのイベントに紐付けられています。
下記のようにすることで、ロード完了後に任意のスクリプトを動かすことが可能です。
マニュアルモード時も同じタイミングで発生しますが、オーバーレイはフェードアウトしません。	

	$(window).one('loadprogressEnd',function(event){
		//event : イベントオブジェクト
	});

#### loadprogressManualEnd
マニュアルモードがオンの場合はこのイベントを発生させることによってオーバーレイをフェードアウトさせることができます。
下記のようにすることで、ロード完了後に行いたい処理を終わらせた後に、オーバーレイをフェードアウトさせられます。
'loadprogressManualEnd'イベントが呼び出されるまではオプションの manualModeStopNum の値で読込のパーセンテージは止まります。

	$(window).one('loadprogressEnd',function(event){
		//ロード完了後に行いたい処理
		$(window).trigger('loadprogressManualEnd');
	});

### CSSについて
ローダーのデザインは全てスタイルシートに記述されています。（つまり、CSSで可能なこと以上はできません。）

読込のアニメーションはアニメーションGIF画像をdataUriを利用してCSS内に直接記述しています。
もちろん外部の画像を指定することもできますが、CSS上での画像の読み込みの優先順位は低い場合があるので、アニメーションがなかなか表示されない場合があります。

loaderprogress.cssには表示するために必須のCSSも含まれていますので、
別のファイルや、loaderprogress.cssの最後に必要なパラメーターのみを追加して上書きするのがおすすめです。

	
