package ckEditor.hong.ckEditor.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${hong.ckImg.pattern}")
    private String ckImgPattern;

    @Value("${hong.ckImg.path}")
    private String ckImgPath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
                .addResourceHandler(ckImgPattern)
                .addResourceLocations("file:///" + ckImgPath);
    }
}