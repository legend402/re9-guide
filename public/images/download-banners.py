#!/usr/bin/env python3
"""
Resident Evil 9: Requiem Banner Images Downloader
下载生化危机9主题的Banner图片用于网站页面
"""

import os
import json
import time
import urllib.request
import urllib.error
from pathlib import Path

# 目标目录
TARGET_DIR = Path("public/images/banners")
CONFIG_FILE = Path("public/images/banners-config.json")

# 创建目标目录
TARGET_DIR.mkdir(parents=True, exist_ok=True)

def download_image(url, filename, description=""):
    """下载单个图片"""
    filepath = TARGET_DIR / filename
    
    # 检查文件是否已存在
    if filepath.exists():
        print(f"  [跳过] {filename} 已存在")
        return True
    
    try:
        print(f"  [下载] {description}: {filename}")
        
        # 设置请求头，模拟浏览器
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
        
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=30) as response:
            with open(filepath, 'wb') as f:
                f.write(response.read())
        
        print(f"    [完成] {filepath}")
        return True
        
    except urllib.error.HTTPError as e:
        print(f"    [错误] HTTP {e.code}: {url}")
        return False
    except Exception as e:
        print(f"    [错误] {str(e)}")
        return False

def main():
    """主函数"""
    print("=" * 60)
    print("Resident Evil 9: Requiem Banner Images Downloader")
    print("=" * 60)
    
    # 读取配置文件
    if not CONFIG_FILE.exists():
        print(f"[错误] 配置文件不存在: {CONFIG_FILE}")
        return
    
    with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
        config = json.load(f)
    
    success_count = 0
    fail_count = 0
    
    # 下载通用Banner
    print("\n[1/6] 下载通用Banner图片...")
    for img in config.get("generalBanners", {}).get("images", []):
        if download_image(img["url"], img["filename"], img["description"]):
            success_count += 1
        else:
            fail_count += 1
        time.sleep(0.5)
    
    # 下载各页面的Banner
    pages = config.get("pages", {})
    
    for page_key, page_data in pages.items():
        page_name = page_data.get("pageName", page_key)
        print(f"\n[页面] {page_name} ({page_data.get('route', '')})")
        
        # Banner图片
        for img in page_data.get("bannerImages", []):
            if download_image(img["url"], img["filename"], img["description"]):
                success_count += 1
            else:
                fail_count += 1
            time.sleep(0.5)
        
        # 武器图片
        if "weaponImages" in page_data:
            print(f"  [武器图片]")
            base_url = page_data["weaponImages"]["baseUrl"]
            for filename, desc in page_data["weaponImages"]["items"].items():
                url = base_url + filename
                if download_image(url, filename, desc):
                    success_count += 1
                else:
                    fail_count += 1
                time.sleep(0.3)
        
        # 敌人图片 - Evil Resource
        if "enemyImages" in page_data:
            if "eviResource" in page_data["enemyImages"]:
                print(f"  [敌人图片 - Evil Resource]")
                base_url = page_data["enemyImages"]["eviResource"]["baseUrl"]
                for filename, desc in page_data["enemyImages"]["eviResource"]["items"].items():
                    url = base_url + filename
                    if download_image(url, filename, desc):
                        success_count += 1
                    else:
                        fail_count += 1
                    time.sleep(0.3)
            
            # 敌人图片 - Creative Uncut
            if "creativeUncut" in page_data["enemyImages"]:
                print(f"  [敌人图片 - Creative Uncut]")
                base_url = page_data["enemyImages"]["creativeUncut"]["baseUrl"]
                for filename, desc in page_data["enemyImages"]["creativeUncut"]["items"].items():
                    url = base_url + filename
                    if download_image(url, filename, desc):
                        success_count += 1
                    else:
                        fail_count += 1
                    time.sleep(0.5)
        
        # 收集品图片
        if "collectibleImages" in page_data:
            print(f"  [收集品图片]")
            base_url = page_data["collectibleImages"]["baseUrl"]
            for filename, desc in page_data["collectibleImages"]["items"].items():
                url = base_url + filename
                if download_image(url, filename, desc):
                    success_count += 1
                else:
                    fail_count += 1
                time.sleep(0.3)
        
        # 地图图片
        if "mapImages" in page_data:
            print(f"  [地图图片]")
            base_url = page_data["mapImages"]["baseUrl"]
            for filename, desc in page_data["mapImages"]["items"].items():
                url = base_url + filename
                if download_image(url, filename, desc):
                    success_count += 1
                else:
                    fail_count += 1
                time.sleep(0.3)
    
    # 统计结果
    print("\n" + "=" * 60)
    print(f"下载完成！成功: {success_count}, 失败: {fail_count}")
    print(f"图片保存位置: {TARGET_DIR.absolute()}")
    print("=" * 60)

if __name__ == "__main__":
    main()
