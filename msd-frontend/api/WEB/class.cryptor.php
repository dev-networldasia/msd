<?php

class Cryptor{

  private $encrypt_method = "AES-256-CBC";
        
  private $secret_key = "XDT-YUGHH-GYGF-YUTY-GHRGFR";
    
  private $iv = "DFYTYUITYUIUYUGYIYT";

 public function __construct() {
 }

 function decryptId($id){
    $id = base64_decode($id);
    $key = hash('sha256', $this->secret_key);
    $iv = substr(hash('sha256', $this->iv), 0, 16);
    $id = openssl_decrypt($id, $this->encrypt_method, $key, 0, $iv);
    return $id;
  }

function encryptId($id){
    $key = hash('sha256', $this->secret_key);
    $iv = substr(hash('sha256', $this->iv), 0, 16);
    $id = openssl_encrypt($id, $this->encrypt_method, $key, 0, $iv);
    $id = base64_encode($id);
    return $id;
  }
}
?>