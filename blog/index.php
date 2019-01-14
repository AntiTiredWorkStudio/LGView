<?php
	if(!isset($_REQUEST['article'])){
		die("no article");
	}
	$path = '../dataset/'.$_REQUEST['article'].'.json';
	$json = file_get_contents($path);
	$page = json_decode($json,true);
	$title = $page['title'];
	$array = $page['content'];
?>

		
<html>
<head>
<title><?php echo $title;?></title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="keywords" content="Around Responsive web template, Bootstrap Web Templates, Flat Web Templates, Android Compatible web template, 
Smartphone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyEricsson, Motorola web design">
<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
<!-- bootstrap-css -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css" media="all">
<!--// bootstrap-css -->
<!-- css -->
<link rel="stylesheet" href="css/style.css" type="text/css" media="all">
<!--// css -->
<!-- font-awesome icons -->
<link href="css/font-awesome.css" rel="stylesheet"> 
<!-- //font-awesome icons -->
<!--link href="css/font.css" rel="stylesheet" type="text/css"-->
<script src="js/jquery-1.11.1.min.js"></script>
<script src="js/bootstrap.js"></script>
<script type="text/javascript" src="js/move-top.js"></script>
<script type="text/javascript" src="js/easing.js"></script>
<script type="text/javascript">
	jQuery(document).ready(function($) {
		$(".scroll").click(function(event){		
			event.preventDefault();
			$('html,body').animate({scrollTop:$(this.hash).offset().top},1000);
		});
	});
</script>	
<!--animate-->
<link href="css/animate.css" rel="stylesheet" type="text/css" media="all">
<script src="js/wow.min.js"></script>
	<script>
		 new WOW().init();
	</script>
<!--//end-animate-->
</head>

<body>
	<!-- header -->
	
	<!-- //header -->
		
		<!-- blog -->
		<div class="blog">
			<!-- container -->
			<div class="container">
				<div class="blog-heading">
					<h2 class="wow fadeInDown animated animated animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInDown;"><?php echo $title;?></h2>
					
				</div>
				<div class="blog-top-grids">
					<div class="col-md-12 blog-top-left-grid">
						<div class="left-blog">
							

<?php
	foreach($array as $value){ 
?>
							<div class="blog-left">
								<div class="blog-left-left wow fadeInUp animated animated animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInUp;">
									<a href="#">
										<img src="<?php echo $value['src']; ?>" alt="">
									</a>
								</div>
								<div class="blog-left-right wow fadeInUp animated animated animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInUp;">
								<p><?php echo $value['text']; ?></p>
								</div>
								<div class="clearfix"> </div>
							</div>
							
<?php
	} 
?>
						</div>
						
					</div>
					
					<div class="clearfix"> </div>
				</div>
			</div>
			<!-- //container -->
		</div>
	<!-- //blog -->
	
	<!-- footer -->
	<div class="footer" style="
    padding-top: 0px;
    padding-bottom: 0px;
">
		<div class="container">
			<div class="copyright wow fadeInUp animated animated animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInUp;">
				<p style="margin-bottom:1em;font-size:1.5em;"><a href="../index.html"><i class="fa fa-reply" ></i> 返回地图</a></p>
			</div>
		</div>
	</div>
	<!-- //footer -->
	
</body></html>