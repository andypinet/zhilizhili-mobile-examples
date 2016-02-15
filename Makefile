all:
	cd www && browser-sync start --server --files='**/*'
watch-template:
	cd resources/ && gulp watch-template --name index --watch "/**/*" 	
watch-style:
	gulp watch-androidsass

update:
	npm update zhilizhili-ui zhilizhili-ui-plus zhilizhili-ui-touch

update-zhilizhili-ui:
	cd node_modules/zhilizhili-ui && npm publish
update-zhilizhili-ui-plus:
	cd node_modules/zhilizhili-ui-plus && npm publish
update-zhilizhili-ui-touch:
	cd node_modules/zhilizhili-ui-touch && npm publish

#用来检测手机页面的
#weinre --boundHost 192.168.0.103
