import net.playstation.np.tcm.TCM
import net.playstation.np.ticket.Ticket
import net.playstation.np.tcm.UnknownException
import net.playstation.np.tcm.UnsupportedVersionException
import net.playstation.np.tcm.BadPassPhraseException
import net.playstation.np.tcm.InvalidCipherInformationException
import net.playstation.np.tcm.NoSuitableCipherInformationException
import net.playstation.np.tcm.BadSignatureException
import net.playstation.np.ticket.BrokenTicketException
import com.fasterxml.jackson.core.JsonGenerationException
import com.fasterxml.jackson.databind.JsonMappingException
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.SerializationFeature
import java.io.File
import java.lang.Math
private const val HYENAS_PROD_ISSUER_ID = 256
private const val HYENAS_STATUS_STATE = 0xff
private const val HYENAS_STATUS_GET_AGE = 0x18
private const val HYENAS_STATUS_IS_SUSPENDED = 0x80
private const val HYENAS_STATUS_IS_CHAT_DISABLED = 0x0100
private const val HYENAS_STATUS_CONTENT_RATING = 0x0200
fun main(args: Array<String>) {
    val debugEnabled = java.lang.Boolean.parseBoolean(args[0])
    val ticketData = File("ticket.dat").readBytes()
    val ticket: Ticket
    try {
        ticket = TCM.getInformationWithoutVerify(ticketData)
        val minimumTimestamp = 1539230579999L
        val beginDateRange = ticket.getIssuedDate()
        val expireDateRange = ticket.getNotOnOrAfterDate()
        val minValidityPeriod = (1000 * 60 * 10 - 1000).toLong()
        val maxValidityPeriod = (1000 * 60 * 60 * 24 * 2).toLong()
        val currentTimestamp = System.currentTimeMillis()
        val validityPeriod = Math.max(0, expireDateRange - beginDateRange)
        val status = ticket.getSubject().getStatus()
        val duration = ticket.getSubject().getDuration()
        var message: String? = when (true) {
            beginDateRange == 0L,
            beginDateRange >= currentTimestamp,
            beginDateRange >= Long.MAX_VALUE - maxValidityPeriod,
            !debugEnabled && beginDateRange <= minimumTimestamp ->
                "Declined credentials as it's not valid yet."
            expireDateRange == 0L,
            beginDateRange > expireDateRange,
            expireDateRange >= Long.MAX_VALUE - minValidityPeriod,
            !debugEnabled && expireDateRange <= currentTimestamp ->
                "Declined credentials as it's past due date."
            validityPeriod !in minValidityPeriod..maxValidityPeriod ->
                "Declined credentials as validity period isn't valid."
            ticket.getIssuerId() < HYENAS_PROD_ISSUER_ID ->
                "We don't support developer credentials at this time."
            HYENAS_STATUS_IS_SUSPENDED <= status and HYENAS_STATUS_STATE ->
                "Access to this PSN® account has been " + (
                        if (duration == 0L) "banned." else "temporarily suspended."
                )
            else -> null
        }
        val isChatDisabled = HYENAS_STATUS_IS_CHAT_DISABLED and status
        val contentRating = HYENAS_STATUS_CONTENT_RATING and status
        val birthdayAge = (status shr HYENAS_STATUS_GET_AGE)
            .coerceIn((Char.MIN_VALUE).toInt()..(Char.MIN_VALUE).toInt())
        
    } catch (e: Exception) {
        if (e is UnknownException) {
            println("Encountered a first, unknown type of exception.")
            print("Please report this error to the developers.")
        } else if (e is UnsupportedVersionException) {
            println("Unable to read ticket structure, fatal exception.")
            print("Please report this error to the developers.")
        } else if (e is BadPassPhraseException) {
            println("Unable to begin integrity check, fatal exception.")
            print("Please report this error to the developers.")
        } else if (e is InvalidCipherInformationException) {
            println("Can't verify your credentials' integrity.")
            print("Please report this error to the developers.")
        } else if (e is NoSuitableCipherInformationException) {
            println("Unable to verify your credentials' integrity.")
            print("Please report this error to the developers.")
        } else if (e is BadSignatureException) {
            println("Your credentials are spoofed, cannot login.")
            print("If this is a mistake, contact the developers.")
        } else if (e is BrokenTicketException) {
            println("Your credentials can't be read, cannot login.")
            print("If this is a mistake, contact the developers.")
        } else {
            println("Encountered a second, unknown type of exception.")
            print("Please report this error to the developers.")
        }
        return
    }
    try {
        val mapper = ObjectMapper()
        mapper
        .disable(SerializationFeature.WRAP_ROOT_VALUE)
        .disable(SerializationFeature.INDENT_OUTPUT)
        .disable(SerializationFeature.FAIL_ON_EMPTY_BEANS)
        .disable(SerializationFeature.WRAP_EXCEPTIONS)
        .enable(SerializationFeature.CLOSE_CLOSEABLE)
        .disable(SerializationFeature.FLUSH_AFTER_WRITE_VALUE)
        .enable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
        .enable(SerializationFeature.WRITE_DATE_KEYS_AS_TIMESTAMPS)
        .disable(SerializationFeature.WRITE_CHAR_ARRAYS_AS_JSON_ARRAYS)
        .enable(SerializationFeature.WRITE_ENUMS_USING_TO_STRING)
        .disable(SerializationFeature.WRITE_ENUMS_USING_INDEX)
        .enable(SerializationFeature.WRITE_SINGLE_ELEM_ARRAYS_UNWRAPPED)
        .disable(SerializationFeature.WRITE_DATE_TIMESTAMPS_AS_NANOSECONDS)
        .enable(SerializationFeature.ORDER_MAP_ENTRIES_BY_KEYS)
        .enable(SerializationFeature.EAGER_SERIALIZER_FETCH)
        .disable(SerializationFeature.USE_EQUALITY_FOR_OBJECT_ID)
        System.out.println(mapper.writeValueAsString(ticket))
    } catch (e: JsonGenerationException) {
        println("Encountered internal serialization problem.")
        print("Please report this error to the developers.")
    } catch (e: JsonMappingException) {
        println("Encountered internal serialization problem.")
        print("Please report this error to the developers.")
    }
}

