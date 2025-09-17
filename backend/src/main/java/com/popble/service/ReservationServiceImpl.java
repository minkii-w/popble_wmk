package com.popble.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.popble.domain.PopupStore;
import com.popble.domain.Reservation;
import com.popble.domain.ReservationTime;
import com.popble.domain.UserProfile;
import com.popble.dto.ReservationDTO;
import com.popble.repository.PopupStoreRepository;
import com.popble.repository.ReservationRepository;
import com.popble.repository.ReservationTimeRepository;
import com.popble.repository.UserProfileRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ReservationServiceImpl implements ReservationService{

    private final UserProfileRepository userProfileRepository;

    private final PopupStoreRepository popupStoreRepository;
	
	private final ReservationRepository reservationRepository;
	
	private final ReservationTimeRepository reservationTimeRepository;
	

  
	
	@Override
    public Long register(ReservationDTO dto) {
        Reservation reservation = dtoToEntity(dto);
        reservationRepository.save(reservation);
        return reservation.getId();
    }

    @Override
    public ReservationDTO get(Long id) {
        return reservationRepository.findById(id)
                .map(this::entityToDto)
                .orElse(null);
    }
    
    @Override
    public List<ReservationDTO> getByUserProfile(Long userProfileId){
    	return reservationRepository.findByUserProfileId(userProfileId)
    			.stream()
    			.map(this::entityToDto)
    			.collect(Collectors.toList());
    }
    

    @Override
    public List<ReservationDTO> getByPopupStore(Long popupStoreId) {
        List<Reservation> reservations = reservationRepository.findByPopupStoreId(popupStoreId);
        return reservations.stream()
                .map(this::entityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public void cancel(Long id) {
        reservationRepository.deleteById(id);
    }

    
    private Reservation dtoToEntity(ReservationDTO dto) {
    	
    	System.out.println("DTO userId: " + dto.getUserProfileId());
    	
    	PopupStore popupStore = popupStoreRepository.findById(dto.getPopupStoreId())
    	        .orElseThrow(() -> new IllegalArgumentException("Invalid popupStoreId"));

    	    UserProfile userProfile = userProfileRepository.findById(dto.getUserProfileId())
    	        .orElseThrow(() -> new IllegalArgumentException("Invalid userProfileId"));
    	    

    	    ReservationTime reservationTime = null;
    	    if(dto.getStartTime() != null && dto.getEndTime() != null && dto.getReservationDate() != null) {
    	    	reservationTime = reservationTimeRepository.findByDateAndStartTimeAndEndTime(dto.getReservationDate(),dto.getStartTime(), dto.getEndTime())
    	    			.orElseThrow(()-> new IllegalArgumentException("Invalid reservationTime"));
    	    }
    	    
        return Reservation.builder()
        		.id(dto.getId())
        		.popupStore(popupStore)
        		.userProfile(userProfile)
        		.reservationTime(reservationTime)
                .reservationCount(dto.getReservationCount())
                .createDateTime(dto.getCreateDateTime())
                .phonenumber(dto.getPhonenumber())
                .build();
    }

    
    
    private ReservationDTO entityToDto(Reservation entity) {
    	
    	ReservationTime reservationTime = entity.getReservationTime();
    	
    	UserProfile userProfile = entity.getUserProfile();
    	
        return ReservationDTO.builder()
                .id(entity.getId())
                .popupStoreId(entity.getPopupStore().getId())
                .userProfileId(entity.getUserProfile().getId())
                .userName(userProfile != null && userProfile.getUsers() != null? 
                		userProfile.getUsers().getName():null)
                .reservationCount(entity.getReservationCount())
                .createDateTime(entity.getCreateDateTime() != null? entity.getCreateDateTime():LocalDateTime.now())
                .phonenumber(entity.getPhonenumber())
                .reservationDate(reservationTime != null? reservationTime.getDate():null)
                .startTime(reservationTime != null? reservationTime.getStartTime():null)
                .endTime(reservationTime != null? reservationTime.getEndTime():null)
                .build();
    }

}
