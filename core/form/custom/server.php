 <?php

    /**
     * 获取
     */
    $data = file_get_contents("php://input");
	
	//$data = $_GET["user"];

    /**
     * 返回
     */
    echo $data;
?>