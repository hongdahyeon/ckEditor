package ckEditor.hong.ckEditor.domain.hongPost.impl;

import ckEditor.hong.ckEditor.domain.hongPost.HongPost;
import ckEditor.hong.ckEditor.domain.hongPost.HongPostRepository;
import ckEditor.hong.ckEditor.domain.hongPost.HongPostService;
import ckEditor.hong.ckEditor.domain.hongPost.dto.HongPostDTO;
import ckEditor.hong.ckEditor.domain.hongPost.vo.HongPostVO;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HongPostServiceImpl implements HongPostService {

    @Value("${hong.ckImg.path}")
    private String fileRoot;

    private final HongPostRepository hongPostRepository;

    @Override
    @Transactional(readOnly = false)
    public Long join(HongPostDTO dto) {
        HongPost hongPost = HongPost.hongPostInsertBuilder()
                                    .title(dto.getTitle())
                                    .content(dto.getContent())
                                    .build();
        HongPost save = hongPostRepository.save(hongPost);
        return save.getId();
    }

    @Override
    @Transactional(readOnly = false)
    public void delete(Long id) {
        HongPost hongPost = hongPostRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("there is no post"));
        hongPost.deletePost();
    }

    @Override
    public List<HongPostVO> list() {
        List<HongPost> hongPosts = hongPostRepository.findAllByDelYnIs("N");
        return hongPosts.stream().map(HongPostVO::new).toList();
    }

    @Override
    public HongPostVO view(Long id) {
        HongPost hongPost = hongPostRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("there is no post"));
        return new HongPostVO(hongPost);
    }

    @Override
    @Transactional(readOnly = false)
    public void edit(Long id, HongPostDTO dto) {
        HongPost hongPost = hongPostRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("there is no post"));
        hongPost.updatePost(dto);
    }

    @Override
    public Map<String, Object> uploadCKImageFile(MultipartFile multipartFile) {

        Map<String, Object> params = new HashMap<>();

        String originalName = multipartFile.getOriginalFilename();
        String extension = originalName.substring(originalName.lastIndexOf(".")+1);
        UUID uuid = UUID.randomUUID();
        String savedFileName = uuid + "." + extension;
        File targetFile = new File(String.format("%s%s%s", fileRoot, File.separator, savedFileName));

        try{
            InputStream fileStream = multipartFile.getInputStream();
            FileUtils.copyInputStreamToFile(fileStream, targetFile);
            params.put("url", "/ckImage/"+savedFileName);
            params.put("responseCode", "success");
        }catch(IOException e){
            FileUtils.deleteQuietly(targetFile);
            params.put("responseCode", "error");
            e.printStackTrace();
        }

        return params;
    }
}